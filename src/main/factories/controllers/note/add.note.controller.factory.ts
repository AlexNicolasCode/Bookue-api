import { AddNoteController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbAddNote } from "../../usecases"
import { makeAddNoteValidation } from "./add.note.validation.factory"

export const makeAddNoteController = (): Controller => {
    const controller = new AddNoteController(makeAddNoteValidation(), makeDbAddNote())
    return controller
}
