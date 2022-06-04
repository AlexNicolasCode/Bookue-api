import { CheckAccountByAccessTokenRepository } from "@/data/protocols"
import { UpdateBook } from "@/domain/usecases"
import { InvalidParamError } from "@/presentation/errors"
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class UpdateBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly updateBook: UpdateBook,
    ) {}

    async handle (request: UpdateBook.Params): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const isValid = await this.updateBook.update(request)
            if (!isValid) {
                return forbidden(new InvalidParamError('accessToken'))
            }
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}