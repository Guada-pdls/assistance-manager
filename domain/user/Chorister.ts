export class Chorister {
    private id?: number;
    private userId: number;
    private isActive: boolean;

    constructor(userId: number, isActive: boolean = true) {
        this.userId = userId
        this.isActive = isActive
    }

    getId(): number {
        if (this.id === undefined) {
            throw new Error("Chorister not persisted yet");
        }
        return this.id;
    }

    getUserId(): number {
        return this.userId
    }

    markInactive() {
        this.isActive = false
    }
}