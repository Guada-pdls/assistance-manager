import { Attendance } from "../attendance/Attendance";
import { Place } from "../place/Place";
import { InvalidRehearsalDateError } from "./errors";

export class Rehearsal {
    startTime: Date;
    endTime: Date;
    notes: string[];
    place: Place;
    attendances: Attendance[];

    constructor(startTime: Date, endTime: Date, place: Place) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.place = place;
        this.notes = [];
        this.attendances = [];
    }

    addNote(note: string) {
        this.notes.push(note);
    }

    addAttendance(attendance: Attendance) {
        this.attendances.push(attendance);
    }

    setDateTimes(startTime: Date, endTime: Date) {
        if (startTime > endTime) {
            throw new InvalidRehearsalDateError();
        }

        this.startTime = startTime;
        this.endTime = endTime;
    }
}