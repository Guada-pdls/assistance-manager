export class VoicePart {
    private title: string;

    constructor(title: string) {
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }
}