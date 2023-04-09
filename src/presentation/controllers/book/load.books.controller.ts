import { LoadAccountByToken, LoadBooks } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { forbidden, ok, serverError} from "@/presentation/helpers"
import { Controller, HttpResponse } from "@/presentation/protocols"

export class LoadBooksController implements Controller {
    constructor (
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly loadBooks: LoadBooks,
    ) {}

    async handle (request: LoadBooksController.Request): Promise<HttpResponse> {
        try {
            const account = await this.loadAccountByToken.load(request.accessToken)
            if (!account) {
                return forbidden(new AccessDeniedError())
            }
            const bookList = await this.loadBooks.load(account.id)
            return ok(bookList)
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
