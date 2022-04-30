import { DeleteBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbDeleteBook } from "@/main/factories/usecases"
import { makeDeleteBookValidation } from "./delete.book.validation.factory"

export const makeDeleteBookController = (): Controller => {
    const controller = new DeleteBookController(makeDeleteBookValidation(), makeDbDeleteBook())
    return controller
}