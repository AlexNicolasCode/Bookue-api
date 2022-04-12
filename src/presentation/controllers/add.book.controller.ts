import { BookModel } from "@/domain/models"
import { AddBook } from "@/domain/usecases"
import { badRequest, ok, serverError } from "../helpers"
import { Controller, HttpReponse, Validation } from "../protocols"

export class AddBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addBook: AddBook,
    ) {}

    async handle (request: AddBookController.Request): Promise<HttpReponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const book = {
                ...request,
                created_at: new Date()
            }
            await this.addBook.add(book)
            return ok(book)
        } catch (e) {
            return serverError(e)
        }
    }
}

export namespace AddBookController {
    export type Request = BookModel
}