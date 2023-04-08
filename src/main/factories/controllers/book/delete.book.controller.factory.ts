import { DeleteBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbDeleteBook } from "@/main/factories/usecases"
import { makeDeleteBookValidation } from "@/main/factories/validators"

export const makeDeleteBookController = (): Controller => {
    return new DeleteBookController(makeDeleteBookValidation(), makeDbDeleteBook())
}