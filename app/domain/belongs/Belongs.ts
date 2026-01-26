export class Belongs {
    choristerId: number;
    voicePartTitle: string;
    divisi: number

    constructor(choristerId: number, voicePartTitle: string, divisi: number) {
        this.choristerId = choristerId
        this.voicePartTitle = voicePartTitle
        this.divisi = divisi
    }
}