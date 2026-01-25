export class InvalidRehearsalDateError extends Error {
    constructor() {
        super("La fecha y hora de inicio del ensayo no puede ser posterior a la de fin.");
    }
}