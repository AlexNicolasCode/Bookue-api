import { UpdateBook } from "@/domain/usecases"
import { badRequest, noContent, serverError } from "../helpers"
import { Controller, Validation, HttpResponse } from "../protocols"

export class UpdateBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly updateBook: UpdateBook,
    ) {}

    async handle (request: any): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            await this.updateBook.update(request)
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}