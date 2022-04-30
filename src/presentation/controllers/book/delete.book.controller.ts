import { DeleteBook } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class DeleteBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly deleteBook: DeleteBook,
    ) {}
    
    async handle (request: DeleteBook.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const isValid = await this.deleteBook.delete(request)
            if (!isValid) {
                return forbidden(new AccessDeniedError())
            }
            return noContent()
        } catch (error) {
            return serverError(error)
        } 
    }
}