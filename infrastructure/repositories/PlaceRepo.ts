import { PrismaClient } from "@prisma/client/extension";
import { Place } from "../../domain/place/Place";

export class PlaceRepository {
    constructor(private prisma: PrismaClient) { }

    async findById(id: number) : Promise<Place | null> {
        const record = await this.prisma.place.findFirst({
            where: {
                id: id,
            },
        });

        return record
    }

    async save(place: Place) : Promise<void> {
        await this.prisma.place.upsert({
            where: { id: place.id },
            update: {
                name: place.name,
            },
            create: {
                name: place.name,
            }
        })
    }
}