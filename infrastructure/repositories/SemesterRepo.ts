import { PrismaClient } from "@prisma/client/extension";
import { Semester } from "../../domain/semester/Semester";

export class SemesterRepository {
    constructor(private prisma: PrismaClient) {}

    async findActiveSemester(date: Date) : Promise<Semester | null> {
        const now = new Date(date)

        const semester = await this.prisma.semester.findFirst({
            where: {
                startDate: {
                    lte: now,
                },
                endDate: {
                    gte: now,
                }
            }
        })

        return semester
    }
        
    async save(semester: Semester) : Promise<void> {
        await this.prisma.semester.upsert({
            where: { year_num: {
            year: semester.getYear(),
            num: semester.getNum(),
            } },
            update: {
            startDate: semester.getStartDate(),
            endDate: semester.getEndDate(),
            },
            create: {
            year: semester.getYear(),
            num: semester.getNum(),
            startDate: semester.getStartDate(),
            endDate: semester.getEndDate(),
            },
        });
    
    }
}