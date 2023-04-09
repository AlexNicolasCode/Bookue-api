import { LoadAccountByToken, LoadBook } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { ok, noContent, serverError, forbidden } from "@/presentation/helpers"
import { Controller, HttpResponse } from "@/presentation/protocols"

export class LoadBookController implements Controller {
    constructor (
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly loadBook: LoadBook,
    ) {}

    async handle (request: LoadBookController.Request): Promise<HttpResponse> {
        try {
            const account = await this.loadAccountByToken.load(request.accessToken)
            if (!account) {
                return forbidden(new AccessDeniedError())
            }
            const book = await this.loadBook.load({
                userId: account.id,
                bookId: request.bookId
            })
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