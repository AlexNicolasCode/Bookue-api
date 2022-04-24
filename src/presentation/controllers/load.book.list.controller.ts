import { LoadBookList } from "@/domain/usecases"
import { ok, noContent, serverError } from "../helpers"
import { Controller, HttpResponse } from "../protocols"

export class LoadBookListController implements Controller {
    constructor (private readonly loadBookList: LoadBookList) {}

    async handle (request: LoadBookListController.Request): Promise<HttpResponse> {
        try {
            const bookList = await this.loadBookList.load(request.userId)
            return bookList.length ? ok(bookList) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadBookListController {
    export type Request = {
        userId: string
    }
}
