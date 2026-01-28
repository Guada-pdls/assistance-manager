export class AttendanceNotFoundError extends Error {
  constructor() {
    super("Asistencia no encontrada.");
  }
}

export class AttendanceAlreadyMarkedError extends Error {
    constructor() {
        super("Asistencia ya marcada.");
    }
}

export class RehearsalClosedError extends Error {
    constructor() {
        super("El ensayo está cerrado para marcar asistencia.");
    }
}

export class ChoristerNotActiveError extends Error {
    constructor() {
        super("El coreuta no está activo.");
    }
}

export class RehearsalNotFoundError extends Error {
    constructor() {
        super("Ensayo no encontrado.");
    }
}

export class ChoristerNotFoundError extends Error {
    constructor() {
        super("Coreuta no encontrado.");
    }
}

export class VoicePartNotFoundError extends Error {
    constructor() {
        super("Cuerda no encontrada.");
    }
}

export class BelongsNotFoundError extends Error {
    constructor() {
        super("Pertenencia a la cuerda no encontrada.");
    }
}

export class InvalidRehearsalDateError extends Error {
    constructor() {
        super("La fecha y hora de inicio del ensayo no puede ser posterior a la de fin.");
    }
}

export class PlaceNotFoundError extends Error {
    constructor() {
        super("Lugar no encontrado.");
    }
}

export class SemesterNotFoundError extends Error {
    constructor() {
        super("Semestre no encontrado.");
    }
}

export class InvalidSemesterDateError extends Error {
    constructor() {
        super("La fecha de inicio del semestre no puede ser posterior a la de fin.");
    }
}