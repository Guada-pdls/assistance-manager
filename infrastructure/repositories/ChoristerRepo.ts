import { PrismaClient } from "@prisma/client/extension";
import { Chorister } from "../../domain/user/Chorister";

export class ChoristerRepository {
    constructor(private prisma: PrismaClient) { }

    async findById(id: number): Promise<Chorister | null> {
        const record = await this.prisma.chorister.findFirst({
            where: {
                id: id,
            },
            include: {
                user: true,
            }
        })

        if (record === null) return null

        return record
    }

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