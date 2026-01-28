import { UserRole } from "./UserRole";

export class User {
    private id?: number;
    private email: string;
    private passwordHash: string;
    private firstName: string;
    private lastName: string;
    private role: UserRole;

    constructor(
        email: string,
        passwordHash: string,
        firstName: string,
        lastName: string,
        role: UserRole = UserRole.CHORISTER
    ) {
        this.email = email
        this.passwordHash = passwordHash
        this.firstName = firstName
        this.lastName = lastName
        this.role = role
    }

    getId() : number {
        if (this.id === undefined) {
            throw new Error("User not persisted yet");
        }
        return this.id
    }
}