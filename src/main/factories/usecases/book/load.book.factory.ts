import { DbLoadBook } from "@/data/usecases"
import { LoadBook } from "@/domain/usecases"
import { BookMongoRepository } from "@/infra"

export const makeDbLoadBook = (): LoadBook => {
    const bookMongoRepository = new BookMongoRepository()
    return new DbLoadBook(bookMongoRepository)
}