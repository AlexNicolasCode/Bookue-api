import { LoadBook } from "@/domain/usecases"
import { ok, noContent, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse } from "@/presentation/protocols"

export class LoadBookController implements Controller {
    constructor (private readonly loadBook: LoadBook) {}

    async handle (request: LoadBookController.Request): Promise<HttpResponse> {
        try {
            const book = await this.loadBook.load({ accessToken: request.accessToken, bookId: request.bookId })
            return book ? ok(book) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadBookController {
    export type Request = {
        accessToken: string
        bookId: string
    }
}