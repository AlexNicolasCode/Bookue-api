import { DbLoadBooks } from "@/data/usecases"
import { LoadBooks } from "@/domain/usecases"
import { BookMongoRepository } from "@/infra"

export const makeDbLoadBooks = (): LoadBooks => {
    const bookMongoRepository = new BookMongoRepository()
    return new DbLoadBooks(bookMongoRepository)
}