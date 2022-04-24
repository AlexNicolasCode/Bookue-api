import { AddBookRepository, LoadBooksRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";
import { mockBookModel } from "tests/domain/mocks";

export class AddBookRepositorySpy implements AddBookRepository {
    bookData: AddBookRepository.Params

    async add (bookData: BookModel): Promise<void> {
        this.bookData = bookData
    }
}

export class LoadBooksRepositorySpy implements LoadBooksRepository {
    userId: string
    result = [
        mockBookModel(),
        mockBookModel(),
        mockBookModel(),
        mockBookModel(),
    ]

    async load (userId: string): Promise<LoadBooksRepository.Result> {
        this.userId = userId
        return this.result
    }
}