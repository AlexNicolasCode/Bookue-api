import { CheckAccountByIdRepository } from "@/data/protocols"
import { UpdateBook } from "@/domain/usecases"
import { InvalidParamError } from "../errors"
import { badRequest, forbidden, noContent, serverError } from "../helpers"
import { Controller, Validation, HttpResponse } from "../protocols"

export class UpdateBookController implements Controller {
    constructor (
        private readonly checkAccountById: CheckAccountByIdRepository,
        private readonly validation: Validation,
        private readonly updateBook: UpdateBook,
    ) {}

    async handle (request: UpdateBook.Params): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const hasAccount = await this.checkAccountById.checkById(request.userId)
            if (!hasAccount) {
                return forbidden(new InvalidParamError('userId'))
            }
            await this.updateBook.update(request)
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}