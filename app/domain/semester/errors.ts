export class InvalidSemesterDateError extends Error {
    constructor() {
        super("La fecha de inicio del semestre no puede ser posterior a la de fin.");
    }
}