import { Place } from "../place/Place"
import { VoicePart } from "../voicePart/VoicePart"
import { RehearsalRule, RehearsalRuleInput } from "./RehearsalRule"

export class RehearsalRuleFactory {
  static fromInput(
    input: RehearsalRuleInput,
    place: Place,
    voiceParts: VoicePart[]
  ): RehearsalRule {

    const [startH, startM] = input.startTime.split(':').map(Number)
    const [endH, endM] = input.endTime.split(':').map(Number)

    return {
      weekday: input.weekday,
      startTime: { hours: startH, minutes: startM },
      endTime: { hours: endH, minutes: endM },
      place,
      voiceParts
    }
  }
}
