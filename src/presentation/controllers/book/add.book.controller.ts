import { AddBook } from "@/domain/usecases"
import { badRequest, ok, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse, Validation } from "@/presentation/protocols"

export class AddBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addBook: AddBook,
    ) {}

    async handle (request: AddBookController.Request): Promise<HttpResponse> {
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
    export type Request = {
        title: string
        author: string
        description: string
        currentPage: number
        pages: number,
        accessToken: string
    }  
}