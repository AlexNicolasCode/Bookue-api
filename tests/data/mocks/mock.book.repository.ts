import { AddBookRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";

export class AddBookRepositorySpy implements AddBookRepository {
    bookData: AddBookRepository.Params

    async add (bookData: BookModel): Promise<void> {
        this.bookData = bookData
    }
}