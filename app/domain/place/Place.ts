export class Place {
    id: number;
    name: string;
    lat: number;
    lon: number;

    constructor(name: string, lat: number, lon: number, id: number) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }
}