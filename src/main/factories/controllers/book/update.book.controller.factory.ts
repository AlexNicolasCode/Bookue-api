import { UpdateBookController } from "@/presentation/controllers"
import { makeDbUpdateBook } from "@/main/factories/usecases"
import { makeUpdateBookValidation } from "@/main/factories/validators"

export const makeUpdateBookController = (): UpdateBookController => {
    return new UpdateBookController(makeUpdateBookValidation(), makeDbUpdateBook())
}