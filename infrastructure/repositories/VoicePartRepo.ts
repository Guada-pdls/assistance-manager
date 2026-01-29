import { PrismaClient } from "@prisma/client/extension";
import { VoicePart } from "../../domain/voicePart/VoicePart";

export class VoicePartRepository {
    constructor(private prisma: PrismaClient) { }

    async findByTitle(title: string): Promise<VoicePart | null> {
        const record = await this.prisma.voicePart.findFirst({
            where: {
                title: title,
            }
        });

        return record
    }

    async save(voicePart: VoicePart): Promise<void> {
        await this.prisma.voicePart.upsert({
            where: { title: voicePart.getTitle() },
            create: {
                title: voicePart.getTitle()
            },
            update: {}
        })
    }
}