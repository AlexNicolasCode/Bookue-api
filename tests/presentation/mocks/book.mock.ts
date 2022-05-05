import { BookModel } from "@/domain/models"
import { AddBook, DeleteBook, LoadBook, LoadBooks } from "@/domain/usecases"
import { mockBookModel } from "tests/domain/mocks"

export class AddBookSpy implements AddBook {
    params: AddBook.Params

    async add (params: AddBook.Params): Promise<void> {
        this.params = params
    }
}

export class LoadBookListSpy implements LoadBooks {
    accessToken: string
    result = [
        mockBookModel(),
        mockBookModel(),
    ]

    async load (accessToken: string): Promise<LoadBooks.Result> {
        this.accessToken = accessToken
        return this.result
    }
}

export class LoadBookSpy implements LoadBook {
    accessToken: string
    bookId: string
    result = mockBookModel()

    async load (data: LoadBook.Request): Promise<BookModel> {
        this.accessToken = data.accessToken
        this.bookId = data.bookId
        return this.result
    }
}


export class DeleteBookSpy implements DeleteBook {
    params: DeleteBook.Params
    result = true

    async delete (params: DeleteBook.Params): Promise<boolean> {
        this.params = params
        return this.result
    }
}