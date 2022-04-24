import { AddBookRepository, LoadBookListRepository, LoadBookRepository } from "@/data/protocols";
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

export class LoadBookRepositorySpy implements LoadBookRepository {
    userId: string
    result = mockBookModel()
    
    async load (userId: string): Promise<LoadBookRepository.Result> {
        this.userId = userId
        return this.result
    }
}