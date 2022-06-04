import { UpdateBookController } from "@/presentation/controllers"
import { makeDbUpdateBook } from "@/main/factories/usecases"
import { makeUpdateBookValidation } from "./update.book.validation.factory"

export const makeUpdateBookController = (): UpdateBookController => {
    const controller = new UpdateBookController(makeUpdateBookValidation(), makeDbUpdateBook())
    return controller
}