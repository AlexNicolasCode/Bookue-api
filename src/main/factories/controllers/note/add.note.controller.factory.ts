import { AddNoteController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbAddNote, makeDbLoadAccountByToken } from "../../usecases"
import { makeAddNoteValidation } from "@/main/factories/validators"

export const makeAddNoteController = (): Controller => {
    return new AddNoteController(makeAddNoteValidation(), makeDbAddNote(), makeDbLoadAccountByToken())
}
