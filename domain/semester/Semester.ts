import { InvalidSemesterDateError } from "./errors";

export class Semester {
    private year: number;
    private num: number;
    private startDate: Date;
    private endDate: Date;

    constructor(year: number, num: number, startDate: Date, endDate: Date) {
        this.year = year;
        this.num = num;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    setDates(startDate: Date, endDate: Date) {
        if (startDate > endDate) {
            throw new InvalidSemesterDateError();
        }

        this.startDate = startDate;
        this.endDate = endDate;
    }

    getYear(): number {
        return this.year;
    }

    getNum(): number {
        return this.num;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }
}