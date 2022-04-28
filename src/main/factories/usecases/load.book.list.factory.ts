import { DbLoadBookList } from "@/data/usecases"
import { LoadBookList } from "@/domain/usecases"
import { BookMongoRepository } from "@/infra"

export const makeDbLoadBookList = (): LoadBookList => {
    const bookMongoRepository = new BookMongoRepository()
    return new DbLoadBookList(bookMongoRepository)
}