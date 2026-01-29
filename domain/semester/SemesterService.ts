import { AttendanceRepository } from "@/infrastructure/repositories/AttendanceRepo";
import { ChoristerRepository } from "@/infrastructure/repositories/ChoristerRepo";
import { RehearsalRepository } from "@/infrastructure/repositories/RehearsalRepo";
import { SemesterRepository } from "@/infrastructure/repositories/SemesterRepo";
import { VoicePartRepository } from "@/infrastructure/repositories/VoicePartRepo";
import { PlaceRepository } from "@/infrastructure/repositories/PlaceRepo";
import { BelongsRepository } from "@/infrastructure/repositories/BelongsRepo";
import { RehearsalRuleInput } from "../valueObjects/RehearsalRule";
import { RehearsalRuleFactory } from "../valueObjects/RehearsalRuleFactory";
import { Semester } from "./Semester";
import { Place } from "../place/Place";
import { VoicePart } from "../voicePart/VoicePart";
import { Chorister } from "../user/Chorister";
import { Attendance } from "../attendance/Attendance";
import { RehearsalGenerator } from "../rehearsal/RehearsalGenerator";
import { BelongsNotFoundError, PlaceNotFoundError, VoicePartNotFoundError } from "../errors";
import { Rehearsal } from "../rehearsal/Rehearsal";

export class SemesterService {
    constructor(
        private semesterRepository: SemesterRepository,
        private attendanceRepository: AttendanceRepository,
        private rehearsalRepository: RehearsalRepository,
        private voicePartRepository: VoicePartRepository,
        private choristerRepository: ChoristerRepository,
        private placeRepository: PlaceRepository,
        private belongsRepository: BelongsRepository
    ) { }

    private async resolveRuleDependencies(inputRules: RehearsalRuleInput[]) {
        const placesById = new Map<number, Place>()
        const voicePartsByTitle = new Map<string, VoicePart>()

        for (const rule of inputRules) {
            if (!placesById.has(rule.placeId)) {
                const place = await this.placeRepository.findById(rule.placeId)
                if (!place) throw new PlaceNotFoundError()
                placesById.set(rule.placeId, place)
            }

            for (const title of rule.voicePartTitles) {
                if (!voicePartsByTitle.has(title)) {
                    const vp = await this.voicePartRepository.findByTitle(title)
                    if (!vp) throw new VoicePartNotFoundError()
                    voicePartsByTitle.set(title, vp)
                }
            }
        }

        const choristers: Chorister[] = []

        for (const vp of voicePartsByTitle.values()) {
            const vpChoristersBelongs = await this.belongsRepository.findByVoicePart(vp.getTitle())

            if (vpChoristersBelongs === null) {
                throw new BelongsNotFoundError()
            }

            for (const belong of vpChoristersBelongs) {
                const chorister = await this.choristerRepository.findById(belong.getChoristerId())
                if (chorister && !choristers.find(c => c.getId() === chorister.getId())) {
                    choristers.push(chorister)
                }
            }
        }

        return { placesById, voicePartsByTitle, choristers }
    }

    async createSemesterWithRehearsals(year: number, num: number, startDate: Date, endDate: Date, inputRules: RehearsalRuleInput[]) : Promise<Rehearsal[]> {
        // Genero el semestre
        const semester = new Semester(year, num, startDate, endDate)
        await this.semesterRepository.save(semester)

        // Para cada place, choristers y vp de entrada, resuelvo en memoria
        const { placesById, voicePartsByTitle, choristers } = await this.resolveRuleDependencies(inputRules)

        // Genero las reglas
        const rules = inputRules.map(inputRule =>
            RehearsalRuleFactory.fromInput(inputRule, placesById.get(inputRule.placeId)!, inputRule.voicePartTitles.map(title => voicePartsByTitle.get(title)!))
        )

        // Genero los ensayos

        const rehearsals = RehearsalGenerator.generate(semester, rules, startDate, endDate)

        // Por cada ensayo, guardo y genero asistencias

        for (const rehearsal of rehearsals) {
            await this.rehearsalRepository.save(rehearsal)

            for (const chorister of choristers) {
                const attendance = new Attendance(chorister.getId(), rehearsal.getId())
                await this.attendanceRepository.save(attendance)
                rehearsal.addAttendance(attendance)
            }
        }

        return rehearsals
    }
}