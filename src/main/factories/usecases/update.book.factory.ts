import { DbUpdateBook } from "@/data/usecases";
import { UpdateBook } from "@/domain/usecases";
import { BookMongoRepository } from "@/infra";

export const makeDbUpdateBook = (): UpdateBook => {
    const bookMongoRepository = new BookMongoRepository()
    return new DbUpdateBook(bookMongoRepository)
}