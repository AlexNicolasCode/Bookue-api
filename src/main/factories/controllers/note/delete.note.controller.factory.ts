import { DeleteNoteController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbDeleteNote } from "../../usecases"
import { makeDeleteNoteValidation } from "@/main/factories/validators"

export const makeDeleteNoteController = (): Controller => {
    const controller = new DeleteNoteController(makeDeleteNoteValidation(), makeDbDeleteNote())
    return controller
}