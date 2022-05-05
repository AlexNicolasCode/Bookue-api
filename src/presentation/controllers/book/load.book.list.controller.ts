import { LoadBooks } from "@/domain/usecases"
import { ok, noContent, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse } from "@/presentation/protocols"

export class LoadBookListController implements Controller {
    constructor (private readonly loadBookList: LoadBooks) {}

    async handle (request: LoadBookListController.Request): Promise<HttpResponse> {
        try {
            const bookList = await this.loadBookList.load(request.accessToken)
            return bookList.length ? ok(bookList) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadBookListController {
    export type Request = {
        accessToken: string
    }
}
