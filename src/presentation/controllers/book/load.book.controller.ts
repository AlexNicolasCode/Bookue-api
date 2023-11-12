import { LoadAccountByToken, LoadBook } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { ok, serverError, forbidden, notFound } from "@/presentation/helpers"
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
                slug: request.slug
            })
            return book ? ok(book) : notFound()
        } catch (error) {
            return serverError()
        }
    }
}

export namespace LoadBookController {
    export type Request = {
        accessToken: string
        slug: string
    }
}