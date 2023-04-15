import { LoadAccountByToken, UpdateBook } from "@/domain/usecases"
import { InvalidParamError } from "@/presentation/errors"
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class UpdateBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly updateBook: UpdateBook,
        private readonly loadAccountByToken: LoadAccountByToken,
    ) {}

    async handle (request: UpdateBookController.Params): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const account = await this.loadAccountByToken.load(request.accessToken)  
            if (!account) {
                return forbidden(new InvalidParamError('accessToken'))
            }
            const book: UpdateBook.Params = {
                bookId: request.bookId,
                userId: account.id,
                ...request,
            }
            await this.updateBook.update(book)
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace UpdateBookController {
    export type Params = {
        title?: string
        author?: string
        description?: string
        currentPage?: number
        pages?: number
        accessToken: string
        bookId: string
    }
}
