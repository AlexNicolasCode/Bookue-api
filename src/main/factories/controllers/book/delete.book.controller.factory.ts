import { DeleteBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbDeleteBook, makeDbLoadAccountByToken } from "@/main/factories/usecases"
import { makeDeleteBookValidation } from "@/main/factories/validators"

export const makeDeleteBookController = (): Controller => {
    const loadAccountByToken = makeDbLoadAccountByToken()
    const deleteBookValidation = makeDeleteBookValidation()
    const deleteBook = makeDbDeleteBook()
    return new DeleteBookController(
        loadAccountByToken,
        deleteBookValidation,
        deleteBook,
    )
}