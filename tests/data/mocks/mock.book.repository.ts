import { AddBookRepository, LoadBooksRepository, LoadBookRepository, UpdateBookRepository } from "@/data/protocols"
import { mockBookModel } from "tests/domain/mocks"

export class AddBookRepositorySpy implements AddBookRepository {
    params: AddBookRepository.Params

    async add (params: AddBookRepository.Params): Promise<void> {
        this.params = params
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

    async loadAll (userId: string): Promise<LoadBooksRepository.Result> {
        this.userId = userId
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