import { AddBook, LoadAccountByToken } from "@/domain/usecases"
import { badRequest, ok, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse, Validation } from "@/presentation/protocols"

export class AddBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addBook: AddBook,
        private readonly loadAccountByToken: LoadAccountByToken,
    ) {}

    async handle (request: AddBookController.Request): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const user = await this.loadAccountByToken.load(request.accessToken)
            const book: AddBook.Params = {
                ...request,
                userId: user.id,
                createdAt: new Date(),
            }
            await this.addBook.add(book)
            return ok(book)
        } catch (error) {
            return serverError()
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