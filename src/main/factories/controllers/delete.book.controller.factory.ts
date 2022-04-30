import { DeleteBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbDeleteBook } from "../usecases"
import { makeDeleteBookValidation } from "./Delete.book.validation.factory"

export const makeDeleteBookController = (): Controller => {
    const controller = new DeleteBookController(makeDeleteBookValidation(), makeDbDeleteBook())
    return controller
}