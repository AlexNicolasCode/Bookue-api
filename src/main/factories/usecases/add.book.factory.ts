import { DbAddBook } from "@/data/usecases";
import { AddBook } from "@/domain/usecases";
import { BookMongoRepository } from "@/infra";

export const makeDbAddBook = (): AddBook => {
    const bookMongoRepository = new BookMongoRepository();
    return new DbAddBook(bookMongoRepository);
}