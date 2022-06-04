import { DbLoadBooks } from "@/data/usecases"
import { LoadBooks } from "@/domain/usecases"
import { AccountMongoRepository, BookMongoRepository } from "@/infra"

export const makeDbLoadBooks = (): LoadBooks => {
    const accountMongoRepository = new AccountMongoRepository()
    const bookMongoRepository = new BookMongoRepository()
    return new DbLoadBooks(accountMongoRepository, bookMongoRepository)
}