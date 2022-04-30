import { DbDeleteBook } from "@/data/usecases"
import { DeleteBook } from "@/domain/usecases"
import { AccountMongoRepository, BookMongoRepository } from "@/infra"

export const makeDbDeleteBook = (): DeleteBook => {
    const accountMongoRepository = new AccountMongoRepository()
    const bookMongoRepository = new BookMongoRepository()
    return new DbDeleteBook(accountMongoRepository, bookMongoRepository)
}