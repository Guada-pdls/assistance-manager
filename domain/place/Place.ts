export class Place {
    private id?: number;
    private name: string;
    private lat: number;
    private lon: number;

    constructor(name: string, lat: number, lon: number) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    _setId(id: number) {
        this.id = id;
    }

    getId(): number {
        if (this.id === undefined) {
            throw new Error("Place not persisted yet");
        }
        return this.id
    }

    getName(): string {
        return this.name;
    }

    getLat(): number {
        return this.lat;
    }

    getLon(): number {
        return this.lon;
    }
}