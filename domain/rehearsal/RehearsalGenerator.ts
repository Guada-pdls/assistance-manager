import { Semester } from "../semester/Semester"
import { RehearsalRule } from "../valueObjects/RehearsalRule"
import { Rehearsal } from "./Rehearsal"

export class RehearsalGenerator {
    static generate(
        semester: Semester,
        rules: RehearsalRule[],
        startDate: Date,
        endDate: Date
    ): Rehearsal[] {
        const rehearsals: Rehearsal[] = [] // Inicializo lista de ensayos vacía

        const current = new Date(startDate) // Fecha actual

        while (current < endDate) {
            const weekDay = current.getDay()
            const rule = rules.find(rule => rule.weekday === weekDay) // Busco la regla que coincida con el dia de la semana en q está current

            if (rule === undefined) { // Si no existe, siguiente dia
                current.setDate(current.getDate() + 1)
                continue
            }

            // Si existe, genero el ensayo
            const startTime = new Date(current)
            startTime.setHours(rule.startTime.hours)
            startTime.setMinutes(rule.startTime.minutes)

            const endTime = new Date(current)
            endTime.setHours(rule.endTime.hours)
            endTime.setMinutes(rule.endTime.minutes)

            const rehearsal = new Rehearsal(startTime, endTime, rule.place, rule.voiceParts, semester)
            rehearsals.push(rehearsal) // Lo agrego

            current.setDate(current.getDate() + 1)
        }

        return rehearsals
    }
}
