import { Attendance } from "../attendance/Attendance";
import { Place } from "../place/Place";
import { Semester } from "../semester/Semester";
import { VoicePart } from "../voicePart/VoicePart";
import { InvalidRehearsalDateError } from "./errors";

export class Rehearsal {
    id: number;
    startTime: Date;
    endTime: Date;
    notes: string[];
    place: Place;
    attendances: Attendance[];
    voiceParts: VoicePart[];
    semester: Semester;

    constructor(id: number, startTime: Date, endTime: Date, place: Place, voiceParts: VoicePart[], semester: Semester) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.place = place;
        this.notes = [];
        this.attendances = [];
        this.voiceParts = voiceParts;
        this.semester = semester;
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