import { LoadBook } from "@/domain/usecases"
import { ok, noContent, serverError } from "../helpers"
import { Controller, HttpResponse } from "../protocols"

export class LoadBookController implements Controller {
    constructor (private readonly loadBook: LoadBook) {}

    async handle (request: LoadBookController.Request): Promise<HttpResponse> {
        try {
            const book = await this.loadBook.load({ userId: request.userId, bookId: request.bookId })
            return book ? ok(book) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadBookController {
    export type Request = {
        userId: string
        bookId: string
    }
}