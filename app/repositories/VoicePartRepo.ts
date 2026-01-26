import { PrismaClient } from "@prisma/client/extension";
import { VoicePart } from "../domain/voicePart/VoicePart";

export class VoicePartRepository {
    constructor(private prisma: PrismaClient) { }

    async save(voicePart: VoicePart): Promise<void> {
        await this.prisma.voicePart.upsert({
            where: { title: voicePart.title },
            create: {
                title: voicePart.title
            },
            update: {}
        })
    }
}