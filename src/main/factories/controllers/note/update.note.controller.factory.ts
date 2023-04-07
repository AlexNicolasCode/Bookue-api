import { UpdateNoteController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbUpdateNote } from "../../usecases"
import { makeUpdateNoteValidation } from "@/main/factories/validators"

export const makeUpdateNoteController = (): Controller => {
    const controller = new UpdateNoteController(makeUpdateNoteValidation(), makeDbUpdateNote())
    return controller
}