export class Belongs {
    private choristerId: number;
    private voicePartTitle: string;
    private divisi: number

    constructor(choristerId: number, voicePartTitle: string, divisi: number) {
        this.choristerId = choristerId
        this.voicePartTitle = voicePartTitle
        this.divisi = divisi
    }

    setDivisi(divisi: number) {
        this.divisi = divisi
    }

    getChoristerId() : number {
        return this.choristerId
    }

    getVoicePartTitle() : string {
        return this.voicePartTitle
    }
    
    getDivisi() : number {
        return this.divisi
    }

}