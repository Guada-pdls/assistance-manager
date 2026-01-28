import { PrismaClient } from "@prisma/client/extension";
import { User } from "../../domain/user/User";

export class UserRepository {
    constructor(private prisma: PrismaClient) { }

    async save(user: User) : Promise<void> {
        await this.prisma.user.upsert({
            where: { id: user.id },
            update: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                passwordHash: user.passwordHash,
            },
            create: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                passwordHash: user.passwordHash,
            },
        });
    
    }
}