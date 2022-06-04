import { DbAddBook } from "@/data/usecases"
import { AddBook } from "@/domain/usecases"
import { AccountMongoRepository, BookMongoRepository } from "@/infra"

export const makeDbAddBook = (): AddBook => {
    const acccountMongoRepository = new AccountMongoRepository()
    const bookMongoRepository = new BookMongoRepository()
    return new DbAddBook(acccountMongoRepository, bookMongoRepository)
}