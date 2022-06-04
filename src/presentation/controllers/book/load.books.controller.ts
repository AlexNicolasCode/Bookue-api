import { LoadBooks } from "@/domain/usecases"
import { ok, noContent, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse } from "@/presentation/protocols"

export class LoadBooksController implements Controller {
    constructor (private readonly loadBooks: LoadBooks) {}

    async handle (request: LoadBooksController.Request): Promise<HttpResponse> {
        try {
            const bookList = await this.loadBooks.load(request.accessToken)
            return bookList.length ? ok(bookList) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadBooksController {
    export type Request = {
        accessToken: string
    }
}
