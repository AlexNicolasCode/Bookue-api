import { AddBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbAddBook } from "../../usecases/book"
import { makeAddBookValidation } from "./add.book.validation.factory"

export const makeAddBookController = (): Controller => {
    const controller = new AddBookController(makeAddBookValidation(), makeDbAddBook())
    return controller
}