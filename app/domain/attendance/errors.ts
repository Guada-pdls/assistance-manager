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
