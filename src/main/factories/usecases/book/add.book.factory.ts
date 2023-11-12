import { DbAddBook } from "@/data/usecases"
import { AddBook } from "@/domain/usecases"
import { BcryptAdapter, BookMongoRepository } from "@/infra"

export const makeDbAddBook = (): AddBook => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const bookMongoRepository = new BookMongoRepository()
    return new DbAddBook(bookMongoRepository, bcryptAdapter)
}