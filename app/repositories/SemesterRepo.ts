import { PrismaClient } from "@prisma/client/extension";
import { Semester } from "../domain/semester/Semester";

export class SemesterRepository {
    constructor(private prisma: PrismaClient) {}

    async save(semester: Semester) : Promise<void> {
        await this.prisma.semester.upsert({
            where: { year_num: {
                year: semester.year,
                num: semester.num,
            } },
            update: {
                startDate: semester.startDate,
                endDate: semester.endDate,
            },
            create: {
                year: semester.year,
                num: semester.num,
                startDate: semester.startDate,
                endDate: semester.endDate,
            },
        });
    
    }
}