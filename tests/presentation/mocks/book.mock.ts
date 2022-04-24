import { BookModel } from "@/domain/models";
import { AddBook, LoadBook, LoadBookList } from "@/domain/usecases";
import { mockBookModel } from "tests/domain/mocks";

export class AddBookSpy implements AddBook {
    params: AddBook.Params

    async add (params: AddBook.Params): Promise<void> {
        this.params = params
    }
}

export class LoadBookListSpy implements LoadBookList {
    userId: string
    result = [
        mockBookModel(),
        mockBookModel(),
    ]

    async load (userId: string): Promise<LoadBookList.Result> {
        this.userId = userId
        return this.result
    }
}

export class LoadBookSpy implements LoadBook {
    userId: string
    bookId: string
    result = mockBookModel()

    async load (data: LoadBook.Request): Promise<BookModel> {
        this.userId = data.userId
        this.bookId = data.bookId
        return this.result
    }
}