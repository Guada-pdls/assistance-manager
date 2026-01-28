import { PrismaClient } from "@prisma/client/extension";
import { Rehearsal } from "../../domain/rehearsal/Rehearsal";
import { VoicePart } from "../../domain/voicePart/VoicePart";

export class RehearsalRepository {
    constructor(private prisma: PrismaClient) { }

    async findById(id: number): Promise<Rehearsal | null> {
        const record = await this.prisma.rehearsal.findFirst({
            where: {
                id: id,
            },
            include: {
                voiceParts: true,
                place: true,
                semester: true,
            }
        })

        if (record === null) return null

        return record
    }

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

    async findActiveRehearsal(date: Date) : Promise<Rehearsal | null> {
        const now = new Date(date)
        const early = new Date(now.getTime() + 20 * 60 * 1000)
        const endOfDay = new Date(now)
        endOfDay.setHours(23, 59, 59, 999)

        const rehearsal = await this.prisma.rehearsal.findFirst({
            where: {
                startTime: {
                    gte: early
                },
                endTime: {
                    lte: endOfDay
                }
            },
            orderBy: {
                startTime: 'asc'
            }
        })

        return rehearsal
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
            where: { id: rehearsal.getId() },
            update: {
                startTime: rehearsal.getStartTime(),
                endTime: rehearsal.getEndTime(),
                voiceParts: {
                    set: rehearsal.getVoiceParts().map(voicePart => ({
                        title: voicePart.getTitle()
                    }))
                },
                notes: rehearsal.getNotes(),
                placeId: rehearsal.getPlace().getId(),
            },
            create: {
                startTime: rehearsal.getStartTime(),
                endTime: rehearsal.getEndTime(),
                voiceParts: {
                    connect: rehearsal.getVoiceParts().map(voicePart => ({
                        title: voicePart.getTitle()
                    })),
                },
                notes: rehearsal.getNotes(),
                placeId: rehearsal.getPlace().getId(),
                semesterYear: rehearsal.getSemester().getYear(),
                semesterNum: rehearsal.getSemester().getNum(),
            }
        })
    }

    async delete(rehearsal: Rehearsal): Promise<void> {
        await this.prisma.rehearsal.delete({
            where: { id: rehearsal.getId() }
        })
    }
}