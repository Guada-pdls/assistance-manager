import { AttendanceRepository } from "@/infrastructure/repositories/AttendanceRepo";
import { ChoristerRepository } from "@/infrastructure/repositories/ChoristerRepo";
import { RehearsalRepository } from "@/infrastructure/repositories/RehearsalRepo";
import { SemesterRepository } from "@/infrastructure/repositories/SemesterRepo";
import { VoicePartRepository } from "@/infrastructure/repositories/VoicePartRepo";
import { RehearsalRule, RehearsalRuleInput } from "../valueObjects/RehearsalRule";
import { Semester } from "./Semester";
import { PlaceNotFoundError, VoicePartNotFoundError } from "../errors";
import { PlaceRepository } from "@/infrastructure/repositories/PlaceRepo";
import { Rehearsal } from "../rehearsal/Rehearsal";

export class SemesterService {
    constructor(
        private semesterRepository: SemesterRepository,
        private attendanceRepository: AttendanceRepository,
        private rehearsalRepository: RehearsalRepository,
        private voicePartRepository: VoicePartRepository,
        private choristerRepository: ChoristerRepository,
        private placeRepository: PlaceRepository
    ) { }

    async createSemesterWithRehearsals(year: number, num: number, startDate: Date, endDate: Date, inputRules: RehearsalRuleInput[]) {
        // Genero el semestre
        const semester = new Semester(year, num, startDate, endDate)
        await this.semesterRepository.save(semester)

        // Para cada place y vp de entrada, resuelvo en memoria
        const places = []
        const placeIds = inputRules.map(rule => rule.placeId)
        for (const placeId of placeIds) {
            const place = await this.placeRepository.findById(placeId)
            if (place === null) {
                throw new PlaceNotFoundError()
            }
            places.push(place)
        }

        const voiceParts = []
        const vpTitles = inputRules.flatMap(rule => rule.voicePartTitles)
        for (const vpTitle of vpTitles) {
            const vp = await this.voicePartRepository.findByTitle(vpTitle)
            if (vp === null) {
                throw new VoicePartNotFoundError()
            }
            voiceParts.push(vp)
        }

        // Para cada regla de entrada, genero una nueva con place, vp y horas formateadas
        const rules: RehearsalRule[] = []
        for (const ruleInput of inputRules) {
            const place = places.find(place => place.getId() === ruleInput.placeId)
            const ruleVoiceParts = voiceParts.filter(vp => ruleInput.voicePartTitles.includes(vp.getTitle()))

            const [startH, startM] = ruleInput.startTime.split(':').map(Number)
            const [endH, endM] = ruleInput.endTime.split(':').map(Number)

            const rule = {
                weekday: ruleInput.weekday,
                startTime: {
                    hours: startH,
                    minutes: startM
                },
                endTime: {
                    hours: endH,
                    minutes: endM
                },
                place: place,
                voiceParts: ruleVoiceParts
            } as RehearsalRule

            rules.push(rule)         
        }

        // Genero los ensayos

        const rehearsals: Rehearsal[] = [] // Inicializo lista de ensayos vacía

        const current = new Date(startDate) // Fecha actual

        while (current < endDate) {
            const weekDay = current.getDay()
            const rule = rules.find(rule => rule.weekday === weekDay) // Busco la regla que coincida con el dia de la semana en q está current

            if (rule === undefined) { // Si no existe, siguiente dia
                current.setDate(current.getDate() + 1)
                continue
            }


        }
    }
}