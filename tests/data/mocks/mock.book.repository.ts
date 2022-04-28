import { AddBookRepository, LoadBookListRepository, LoadBookRepository, UpdateBookRepository } from "@/data/protocols";
import { mockBookModel } from "tests/domain/mocks";

export class AddBookRepositorySpy implements AddBookRepository {
    bookData: AddBookRepository.Params

    async add (bookData: AddBookRepository.Params): Promise<void> {
        this.bookData = bookData
    }
}

export class LoadBookListRepositorySpy implements LoadBookListRepository {
    accessToken: string
    result = [
        mockBookModel(),
        mockBookModel(),
        mockBookModel(),
        mockBookModel(),
    ]

    async loadAll (accessToken: string): Promise<LoadBookListRepository.Result> {
        this.accessToken = accessToken
        return this.result
    }
}

export class LoadBookRepositorySpy implements LoadBookRepository {
    accessToken: string
    bookId: string
    result = mockBookModel()
    
    async loadOne (data: LoadBookRepository.Request): Promise<LoadBookRepository.Result> {
        this.accessToken = data.accessToken
        this.bookId = data.bookId
        return this.result
    }
}

export class UpdateBookRepositorySpy implements UpdateBookRepository {
    params: UpdateBookRepository.Params
    
    async update (params: UpdateBookRepository.Params): Promise<void> {
        this.params = params
    }
}