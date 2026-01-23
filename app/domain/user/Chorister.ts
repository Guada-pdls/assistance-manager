export class Chorister {
    id: number;
    userId: number;
    isActive: boolean;

    constructor(id: number, userId: number, isActive: boolean = true) {
        this.id = id
        this.userId = userId
        this.isActive = isActive
    }

    markInactive() {
        this.isActive = false
    }
}