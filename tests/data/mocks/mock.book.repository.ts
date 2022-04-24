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

    async loadAll (userId: string): Promise<LoadBookListRepository.Result> {
        this.userId = userId
        return this.result
    }
}

export class LoadBookRepositorySpy implements LoadBookRepository {
    userId: string
    bookId: string
    result = mockBookModel()
    
    async load (data: LoadBookRepository.Request): Promise<LoadBookRepository.Result> {
        this.userId = data.userId
        this.bookId = data.bookId
        return this.result
    }
}