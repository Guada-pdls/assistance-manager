import { PrismaClient } from "@prisma/client/extension";
import { Rehearsal } from "../domain/rehearsal/Rehearsal";
import { VoicePart } from "../domain/voicePart/VoicePart";

export class RehearsalRepository {
    constructor(private prisma: PrismaClient) { }

    async findBySemester(year: number, num: number): Promise<Rehearsal[] | null> {
        const records = await this.prisma.rehearsal.findMany({
            where: {
                semester: {
                    year: year,
                    num: num,
                }
            },
        });

        if (records.length === 0) {
            return null;
        }

        return records
    }

    async findByDate(dateTime: Date): Promise<Rehearsal[] | null> {
        const startOfDay = new Date(dateTime)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(dateTime)
        endOfDay.setHours(23, 59, 59, 999)
        const records = await this.prisma.rehearsal.findMany({
            where: {
                startTime: {
                    lte: endOfDay,
                    gte: startOfDay
                },
            },
            orderBy: {
                startTime: 'asc'
            }
        });

        if (records.length === 0) return null

        return records
    }

    async findBySemesterAndVoiceParts(year: number, num: number, voiceParts: VoicePart[])
        : Promise<Rehearsal | null> {
        const records = await this.prisma.rehearsal.findMany({
            where: {
                year,
                num,
                voiceParts: {
                    some: {
                        title: {
                            in: voiceParts
                        }
                    }
                }
            }
        })

        if (records.length === 0) return null

        return records
    }

    async save(rehearsal: Rehearsal): Promise<void> {
        await this.prisma.rehearsal.upsert({
            where: { id: rehearsal.id },
            update: {
                startTime: rehearsal.startTime,
                endTime: rehearsal.endTime,
                voiceParts: {
                    set: rehearsal.voiceParts.map(voicePart => ({
                        title: voicePart.title
                    }))
                },
                notes: rehearsal.notes,
                placeId: rehearsal.place.id,
            },
            create: {
                startTime: rehearsal.startTime,
                endTime: rehearsal.endTime,
                voiceParts: {
                    connect: rehearsal.voiceParts.map(voicePart => ({
                        title: voicePart.title
                    })),
                },
                notes: rehearsal.notes,
                placeId: rehearsal.place.id,
                semesterYear: rehearsal.semester.year,
                semesterNum: rehearsal.semester.num,
            }
        })
    }

    async delete(rehearsal: Rehearsal): Promise<void> {
        await this.prisma.rehearsal.delete({
            where: { id: rehearsal.id }
        })
    }
}