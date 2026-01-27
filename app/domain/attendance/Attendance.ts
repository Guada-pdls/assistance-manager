import { Rehearsal } from "../rehearsal/Rehearsal";
import { Chorister } from "../user/Chorister";
import { AttendanceState } from "./AttendanceState";
import { AttendanceAlreadyMarkedError, ChoristerNotActiveError, RehearsalClosedError } from "./errors";

export class Attendance {
    private choristerId: number;
    private rehearsalId: number;
    private state: AttendanceState;
    private arrivalTime: Date | null;

    constructor(choristerId: number, rehearsalId: number) {
        this.choristerId = choristerId;
        this.rehearsalId = rehearsalId;
        this.state = AttendanceState.AUSENTE
        this.arrivalTime = null;
    }

    markArrival(arrivalTime: Date, rehearsal: Rehearsal, chorister: Chorister) {
        // Verificar si la asistencia ya está marcada
        if (this.state !== AttendanceState.AUSENTE) {
            throw new AttendanceAlreadyMarkedError();
        }

        // Verificar si el ensayo está cerrado para marcar asistencia
        if (arrivalTime > rehearsal.endTime) {
            throw new RehearsalClosedError();
        }

        // Verificar que el coreuta esté activo
        if (!chorister.isActive) {
            throw new ChoristerNotActiveError();
        }

        this.arrivalTime = arrivalTime;

        // Si llegó hasta 15 minutos después del inicio, se considera puntual

        const fifteenMinutesMs = 15 * 60 * 1000;
        const limit = new Date(rehearsal.startTime.getTime() + fifteenMinutesMs);

        if (arrivalTime <= limit) {
            this.state = AttendanceState.PUNTUAL;
        } else {
            this.state = AttendanceState.LLEGADA_TARDE;
        }
    }

    justifyAbsence() {
        this.state = AttendanceState.JUSTIFICADA;
    }
}