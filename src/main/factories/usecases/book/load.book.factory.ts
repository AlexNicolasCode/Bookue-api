import { DbLoadBook } from "@/data/usecases"
import { LoadBook } from "@/domain/usecases"
import { AccountMongoRepository, BookMongoRepository } from "@/infra"

export const makeDbLoadBook = (): LoadBook => {
    const accountMongoRepository = new AccountMongoRepository()
    const bookMongoRepository = new BookMongoRepository()
    return new DbLoadBook(accountMongoRepository, bookMongoRepository)
}