import { AddBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeAddBookValidation } from "@/main/factories/validators"
import { makeDbAddBook, makeDbLoadAccountByToken } from "../../usecases"

export const makeAddBookController = (): Controller => {
    const addBookValidation = makeAddBookValidation()
    const dbAddBook = makeDbAddBook()
    const dbLoadAccountByToken = makeDbLoadAccountByToken()
    return new AddBookController(
        addBookValidation,
        dbAddBook,
        dbLoadAccountByToken,
    )
}