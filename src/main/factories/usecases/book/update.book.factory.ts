import { DbUpdateBook } from "@/data/usecases"
import { UpdateBook } from "@/domain/usecases"
import { AccountMongoRepository, BookMongoRepository } from "@/infra"

export const makeDbUpdateBook = (): UpdateBook => {
    const accountMongoRepository = new AccountMongoRepository()
    const bookMongoRepository = new BookMongoRepository()
    return new DbUpdateBook(accountMongoRepository, bookMongoRepository)
}