import { AddBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbAddBook } from "../../usecases/book"
import { makeAddBookValidation } from "@/main/factories/validators"

export const makeAddBookController = (): Controller => {
    return new AddBookController(makeAddBookValidation(), makeDbAddBook())
}