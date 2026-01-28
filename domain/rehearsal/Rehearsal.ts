import { Attendance } from "../attendance/Attendance";
import { Place } from "../place/Place";
import { Semester } from "../semester/Semester";
import { VoicePart } from "../voicePart/VoicePart";
import { InvalidRehearsalDateError } from "../errors";

export class Rehearsal {
    private id?: number;
    private startTime: Date;
    private endTime: Date;
    private notes: string[];
    private place: Place;
    private attendances: Attendance[];
    private voiceParts: VoicePart[];
    private semester: Semester;

    constructor(startTime: Date, endTime: Date, place: Place, voiceParts: VoicePart[], semester: Semester) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.place = place;
        this.notes = [];
        this.attendances = [];
        this.voiceParts = voiceParts;
        this.semester = semester;
    }
    
    /* usado solo por el repo */
    _setId(id: number) {
        this.id = id;
    }

    getId(): number {
        if (this.id === undefined) {
            throw new Error("Rehearsal not persisted yet");
        }
        return this.id;
    }

    getStartTime(): Date {
        return this.startTime;
    }

    getEndTime(): Date {
        return this.endTime;
    }

    getNotes(): string[] {
        return this.notes;
    }

    getPlace(): Place {
        return this.place;
    }

    getAttendances(): Attendance[] {
        return this.attendances;
    }

    getVoiceParts(): VoicePart[] {
        return this.voiceParts;
    }

    getSemester(): Semester {
        return this.semester;
    }

    setPlace(place: Place) {
        this.place = place;
    }

    setVoiceParts(voiceParts: VoicePart[]) {
        this.voiceParts = voiceParts;
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