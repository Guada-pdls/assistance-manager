import { RehearsalRepository } from "@/infrastructure/repositories/RehearsalRepo";
import { InvalidRehearsalDateError, PlaceNotFoundError, RehearsalNotFoundError, SemesterNotFoundError } from "../errors";
import { PlaceRepository } from "@/infrastructure/repositories/PlaceRepo";
import { Rehearsal } from "./Rehearsal";
import { SemesterRepository } from "@/infrastructure/repositories/SemesterRepo";
import { VoicePart } from "../voicePart/VoicePart";

export class RehearsalService {
    constructor(
        private rehearsalRepository: RehearsalRepository,
        private placeRepository: PlaceRepository,
        private semesterRepository: SemesterRepository
    ) { }

    async createRehearsal(draft: RehearsalDraft) : Promise<Rehearsal> {
        if (draft.startTime > draft.endTime) {
            throw new InvalidRehearsalDateError()
        }

        const place = await this.placeRepository.findById(draft.placeId)

        if (place === null) {
            throw new PlaceNotFoundError()
        }

        const semester = await this.semesterRepository.findActiveSemester(draft.startTime)

        if (semester === null) {
            throw new SemesterNotFoundError()
        }

        const voiceParts = draft.voicePartTitles.map(title => new VoicePart(title))

        const rehearsal = new Rehearsal(draft.startTime, draft.endTime, place, voiceParts, semester)

        await this.rehearsalRepository.save(rehearsal)

        return rehearsal
    }

    async updateRehearsal(id: number, draft: RehearsalDraft) : Promise<Rehearsal> {
        const rehearsal = await this.rehearsalRepository.findById(id)

        if (rehearsal === null) {
            throw new RehearsalNotFoundError()
        }

        if (draft.startTime > draft.endTime) {
            throw new InvalidRehearsalDateError()
        }

        const place = await this.placeRepository.findById(draft.placeId)

        if (place === null) {
            throw new PlaceNotFoundError()
        }

        const voiceParts = draft.voicePartTitles.map(title => new VoicePart(title))

        rehearsal.setDateTimes(draft.startTime, draft.endTime)
        rehearsal.setPlace(place)
        rehearsal.setVoiceParts(voiceParts)

        await this.rehearsalRepository.save(rehearsal)

        return rehearsal
    }

    async deleteRehearsal(id: number) : Promise<void> {
        const rehearsal = await this.rehearsalRepository.findById(id)

        if (rehearsal === null) {
            throw new RehearsalNotFoundError()
        }

        await this.rehearsalRepository.delete(rehearsal)    
    }

    async getActiveRehearsal(date: Date) : Promise<Rehearsal | null> {
        return await this.rehearsalRepository.findActiveRehearsal(date)
    }
}