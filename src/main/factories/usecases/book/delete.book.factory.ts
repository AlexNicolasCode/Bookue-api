import { DbDeleteBook } from "@/data/usecases"
import { DeleteBook } from "@/domain/usecases"
import { BookMongoRepository } from "@/infra"

export const makeDbDeleteBook = (): DeleteBook => {
    const bookMongoRepository = new BookMongoRepository()
    return new DbDeleteBook(bookMongoRepository)
}