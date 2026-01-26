import { PrismaClient } from "@prisma/client/extension";
import { Chorister } from "../domain/user/Chorister";

export class ChoristerRepository {
    constructor(private prisma: PrismaClient) { }

    async save(chorister: Chorister): Promise<void> {
        await this.prisma.chorister.upsert({
            where: { id: chorister.id },
            update: {
                isActive: chorister.isActive,
            },
            create: {
                userId: chorister.userId,
                isActive: chorister.isActive,
            }
        })
    }
}