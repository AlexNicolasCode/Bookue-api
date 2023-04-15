import { DeleteBook, LoadAccountByToken } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class DeleteBookController implements Controller {
    constructor (
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly validation: Validation,
        private readonly deleteBook: DeleteBook,
    ) {}
    
    async handle (request: DeleteBookController.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const account = await this.loadAccountByToken.load(request.accessToken)
            if (!account) {
                return forbidden(new AccessDeniedError())
            }
            await this.deleteBook.delete({
                userId: account.id,
                bookId: request.bookId,
            })
            return noContent()
        } catch (error) {
            return serverError(error)
        } 
    }
}

export namespace DeleteBookController {
    export type Params = {
        accessToken: string
        bookId: string
    }
}