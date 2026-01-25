import { PrismaClient } from "@prisma/client/extension";
import { Attendance } from "../domain/attendance/Attendance";
import { AttendanceState } from "../domain/attendance/AttendanceState";

export class AttendanceRepository {
    constructor(private prisma: PrismaClient) {}

    async findByChoristerAndSemester(choristerId: number, year: number, num: number) : Promise<Attendance[] | null> {
        const records = await this.prisma.attendance.findMany({
            where: {
                choristerId: choristerId,
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

    async findByRehearsal(rehearsalId: number) : Promise<Attendance[] | null> {
        const records = await this.prisma.attendance.findMany({
            where: {
                rehearsalId: rehearsalId,
            },
        });

        if (records.length === 0) {
            return null;
        }

        return records
    }

    async findByChoristerAndState(choristerId: number, state: AttendanceState, year: number, num: number) : Promise<Attendance[] | null> {
        const records = await this.prisma.attendance.findMany({
            where: {
                choristerId: choristerId,
                state: state,
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

    async save(attendance: Attendance) : Promise<void> {
        await this.prisma.attendance.upsert({
            where: { choristerId_rehearsalId: {
                choristerId: attendance.choristerId,
                rehearsalId: attendance.rehearsalId,
            } },
            update: {
                state: attendance.state,
            },
            create: {
                state: attendance.state,
                choristerId: attendance.choristerId,
                rehearsalId: attendance.rehearsalId,
            },
        });
    }
}