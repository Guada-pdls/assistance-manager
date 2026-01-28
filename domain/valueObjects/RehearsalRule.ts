import { Place } from "../place/Place"
import { VoicePart } from "../voicePart/VoicePart"

type Weekday =
  | 0 // domingo
  | 1 
  | 2
  | 3
  | 4
  | 5
  | 6 // sábado

export type RehearsalRuleInput = {
  weekday: Weekday
  startTime: string // "20:00"
  endTime: string   // "22:00"
  placeId: number
  voicePartTitles: string[]
}

export type RehearsalRule = {
  weekday: Weekday
  startTime: {
    hours: number
    minutes: number
  }
  endTime: {
    hours: number
    minutes: number
  }
  place: Place
  voiceParts: VoicePart[]
}
