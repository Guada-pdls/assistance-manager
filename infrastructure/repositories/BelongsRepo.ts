import { PrismaClient } from "@prisma/client/extension";
import { VoicePart } from "../../domain/voicePart/VoicePart";
import { Belongs } from "../../domain/belongs/Belongs";

export class BelongsRepository {
    constructor(private prisma: PrismaClient) { }

    async find(choristerId: number, voicePart: VoicePart): Promise<Belongs | null> {
        const record = await this.prisma.belongs.findFirst({
            where: {
                choristerId: choristerId,
                voicePart: {
                    title: voicePart.getTitle()
                }
            }
        })

        if (record === null) return null

        return record
    }

    async save(belongs: Belongs): Promise<void> {
        await this.prisma.belongs.upsert({
            where: {
            choristerId_title: {
                choristerId: belongs.getChoristerId(),
                title: belongs.getVoicePartTitle()
            }
            },
            create: {
            choristerId: belongs.getChoristerId(),
            voicePartTitle: belongs.getVoicePartTitle()
            },
            update: {
            divisi: belongs.getDivisi()
            }
        })
    }

    async delete(belongs: Belongs) : Promise<void> {
        await this.prisma.belongs.delete({
            where: {
                choristerId_title: {
                    choristerId: belongs.getChoristerId(),
                    title: belongs.getVoicePartTitle()
                }
            }
        })
    }

    async findByChorister(choristerId: number): Promise<Belongs[] | null> {
        const records = await this.prisma.belongs.findMany({
            where: {
                choristerId: choristerId
            }
        })

        if (records.length === 0) return null

        return records
    }

    async findByVoicePart(title: string) : Promise<Belongs[] | null> {
        const records = await this.prisma.belongs.findMany({
            where: {
                voicePartTile: title
            }
        })

        if (records.length === 0) return null

        return records
    }
}