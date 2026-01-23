export class Belongs {
    choristerId: number;
    rehearsalId: number;
    divisi: number

    constructor(choristerId: number, rehearsalId: number, divisi: number) {
        this.choristerId = choristerId
        this.rehearsalId = rehearsalId
        this.divisi = divisi
    }
}