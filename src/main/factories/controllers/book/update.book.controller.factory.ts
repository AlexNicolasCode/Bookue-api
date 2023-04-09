import { UpdateBookController } from "@/presentation/controllers"
import { makeDbLoadAccountByToken, makeDbUpdateBook } from "@/main/factories/usecases"
import { makeUpdateBookValidation } from "@/main/factories/validators"

export const makeUpdateBookController = (): UpdateBookController => {
    const updateBookValidation = makeUpdateBookValidation()
    const updateBook = makeDbUpdateBook()
    const loadAccountByToken = makeDbLoadAccountByToken()
    return new UpdateBookController(
        updateBookValidation,
        updateBook,
        loadAccountByToken,
    )
}