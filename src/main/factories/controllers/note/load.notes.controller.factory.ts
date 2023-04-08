import { LoadNotesController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadNotes } from "../../usecases"
import { makeLoadNotesValidation } from "@/main/factories/validators"

export const makeLoadNotesController = (): Controller => {
    return new LoadNotesController(makeLoadNotesValidation(), makeDbLoadNotes())
}
