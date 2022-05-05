import { DbLoadBookList } from "@/data/usecases"
import { LoadBooks } from "@/domain/usecases"
import { BookMongoRepository } from "@/infra"

export const makeDbLoadBookList = (): LoadBooks => {
    const bookMongoRepository = new BookMongoRepository()
    return new DbLoadBookList(bookMongoRepository)
}