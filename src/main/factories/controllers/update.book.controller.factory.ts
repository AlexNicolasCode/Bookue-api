import { AccountMongoRepository } from "@/infra"
import { UpdateBookController } from "@/presentation/controllers"
import { makeDbUpdateBook } from "../usecases"
import { makeUpdateBookValidation } from "./update.book.validation.factory"

export const makeUpdateBookController = (): UpdateBookController => {
    const accountMongoRepository = new AccountMongoRepository()
    const controller = new UpdateBookController(accountMongoRepository, makeUpdateBookValidation(), makeDbUpdateBook())
    return controller
}