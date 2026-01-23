export class Semester {
    year: number;
    num: number;
    startDate: Date;
    endDate: Date;

    constructor(year: number, num: number, startDate: Date, endDate: Date) {
        this.year = year;
        this.num = num;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    setDates(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}