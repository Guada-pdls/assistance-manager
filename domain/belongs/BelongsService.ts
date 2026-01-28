import { BelongsRepository } from "@/infrastructure/repositories/BelongsRepo";
import { Belongs } from "./Belongs";
import { VoicePartRepository } from "@/infrastructure/repositories/VoicePartRepo";
import { BelongsNotFoundError, VoicePartNotFoundError } from "./errors";

export class BelongsService {
    constructor(
        private belongsRepository: BelongsRepository,
        private voicePartRepository: VoicePartRepository
    ) { }

    async assign(choristerId: number, voicePartTitle: string, divisi: number) {
        const voicePart = await this.voicePartRepository.findByTitle(voicePartTitle)

        if (voicePart === null) throw new VoicePartNotFoundError()

        const belongs = await this.belongsRepository.find(choristerId, voicePart)

        if (belongs !== null) {
            belongs.setDivisi(divisi)
            await this.belongsRepository.save(belongs)
        } else {
            const newBelongs = new Belongs(choristerId, voicePartTitle, divisi)
            await this.belongsRepository.save(newBelongs)
        }
    }

    async unassign(choristerId: number, voicePartTitle: string) {
        const voicePart = await this.voicePartRepository.findByTitle(voicePartTitle)

        if (voicePart === null) throw new VoicePartNotFoundError()

        const belongs = await this.belongsRepository.find(choristerId, voicePart)

        if (belongs === null) throw new BelongsNotFoundError()

        await this.belongsRepository.delete(belongs)
    }
}