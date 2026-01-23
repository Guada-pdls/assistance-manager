import { UserRole } from "./UserRole";

export class User {
    id: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole;

    constructor(
        id: number,
        email: string,
        passwordHash: string,
        firstName: string,
        lastName: string,
        role: UserRole = UserRole.CHORISTER
    ) {
        this.id = id
        this.email = email
        this.passwordHash = passwordHash
        this.firstName = firstName
        this.lastName = lastName
        this.role = role
    }

}