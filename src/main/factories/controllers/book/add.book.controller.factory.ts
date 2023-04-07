import { AddBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbAddBook } from "../../usecases/book"
import { makeAddBookValidation } from "@/main/factories/validators"

export const makeAddBookController = (): Controller => {
    const controller = new AddBookController(makeAddBookValidation(), makeDbAddBook())
    return controller
}