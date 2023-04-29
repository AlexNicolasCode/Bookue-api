import { DeleteNoteController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbDeleteNote, makeDbLoadAccountByToken } from "../../usecases"
import { makeDeleteNoteValidation } from "@/main/factories/validators"

export const makeDeleteNoteController = (): Controller => {
    return new DeleteNoteController(makeDeleteNoteValidation(), makeDbLoadAccountByToken(), makeDbDeleteNote())
}