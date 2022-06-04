import { LoadNotesController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadNotes } from "../../usecases"
import { makeLoadNotesValidation } from "./load.notes.validation.factory"

export const makeLoadNotesController = (): Controller => {
    const controller = new LoadNotesController(makeLoadNotesValidation(), makeDbLoadNotes())
    return controller
}
