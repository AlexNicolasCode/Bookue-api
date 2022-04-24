import { AddBookRepository, LoadBookListRepository } from "@/data/protocols";
import { mockBookModel } from "tests/domain/mocks";

export class AddBookRepositorySpy implements AddBookRepository {
    bookData: AddBookRepository.Params

    async add (bookData: AddBookRepository.Params): Promise<void> {
        this.bookData = bookData
    }
}

export class LoadBookListRepositorySpy implements LoadBookListRepository {
    userId: string
    result = [
        mockBookModel(),
        mockBookModel(),
        mockBookModel(),
        mockBookModel(),
    ]

    async load (userId: string): Promise<LoadBookListRepository.Result> {
        this.userId = userId
        return this.result
    }
}