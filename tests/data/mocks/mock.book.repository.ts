import { AddBookRepository, LoadBooksRepository, LoadBookRepository, UpdateBookRepository } from "@/data/protocols"
import { mockBook } from "tests/domain/mocks"

export class AddBookRepositorySpy implements AddBookRepository {
    params: AddBookRepository.Params

    async add (params: AddBookRepository.Params): Promise<void> {
        this.params = params
    }
}

export class LoadBooksRepositorySpy implements LoadBooksRepository {
    userId: string
    result = [
        mockBook(),
        mockBook(),
        mockBook(),
        mockBook(),
    ]

    async loadAll (userId: string): Promise<LoadBooksRepository.Result> {
        this.userId = userId
        return this.result
    }
}

export class LoadBookRepositorySpy implements LoadBookRepository {
    userId: string
    bookId: string
    result = mockBook()
    
    async loadOne (data: LoadBookRepository.Request): Promise<LoadBookRepository.Result> {
        this.userId = data.userId
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