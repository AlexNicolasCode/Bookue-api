import { BookModel } from "@/domain/models"
import { AddBook, DeleteBook, LoadBook, LoadBooks } from "@/domain/usecases"
import { mockBook } from "tests/domain/mocks"

export class AddBookSpy implements AddBook {
    params: AddBook.Params

    async add (params: AddBook.Params): Promise<void> {
        this.params = params
    }
}

export class LoadBooksSpy implements LoadBooks {
    accessToken: string
    result = [
        mockBook(),
        mockBook(),
    ]

    async load (accessToken: string): Promise<LoadBooks.Result> {
        this.accessToken = accessToken
        return this.result
    }
}

export class LoadBookSpy implements LoadBook {
    userId: string
    bookId: string
    result = mockBook()

    async load (data: LoadBook.Request): Promise<BookModel> {
        this.userId = data.userId
        this.bookId = data.bookId
        return this.result
    }
}


export class DeleteBookSpy implements DeleteBook {
    params: DeleteBook.Params

    async delete (params: DeleteBook.Params): Promise<void> {
        this.params = params
    }
}