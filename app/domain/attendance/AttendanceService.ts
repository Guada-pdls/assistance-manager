import { AttendanceRepository } from "@/app/repositories/AttendanceRepo";
import { Attendance } from "./Attendance";
import { RehearsalRepository } from "@/app/repositories/RehearsalRepo";
import { AttendanceNotFoundError, ChoristerNotFoundError, RehearsalNotFoundError } from "./errors";
import { ChoristerRepository } from "@/app/repositories/ChoristerRepo";
import { AttendanceState } from "./AttendanceState";

export class AttendanceService {
    constructor(
        private attendanceRepository: AttendanceRepository,
        private rehearsalRepository: RehearsalRepository,
        private choristerRepository: ChoristerRepository
    ) {}

    async markArrival(choristerId: number, arrivalTime: Date) : Promise<Attendance> {
        const rehearsal = await this.rehearsalRepository.findActiveRehearsal(arrivalTime)

        if (rehearsal === null) {
            throw new RehearsalNotFoundError()
        }

        const chorister = await this.choristerRepository.findById(choristerId)

        if (chorister === null) {
            throw new ChoristerNotFoundError()
        }

        const attendance = await this.attendanceRepository.findByChoristerAndRehearsal(choristerId, rehearsal.id)

        if (attendance === null) {
            throw new AttendanceNotFoundError()
        }

        attendance.markArrival(arrivalTime, rehearsal, chorister)

        await this.attendanceRepository.save(attendance)

        return attendance
    }

    async updateState(attendanceId: number, newState: AttendanceState) : Promise<Attendance> {
        const attendance = await this.attendanceRepository.findById(attendanceId)
        
        if (!attendance) {
            throw new AttendanceNotFoundError()
        }

        attendance.state = newState

        await this.attendanceRepository.save(attendance
    }
}