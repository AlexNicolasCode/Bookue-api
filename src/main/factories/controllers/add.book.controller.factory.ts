import { AddBookController } from "@/presentation/controllers/add.book.controller"
import { Controller } from "@/presentation/protocols"
import { makeDbAddBook } from "../usecases"
import { makeAddBookValidation } from "./add.book.validation.factory"

export const makeAddBookController = (): Controller => {
    const controller = new AddBookController(makeAddBookValidation(), makeDbAddBook())
    return controller
}