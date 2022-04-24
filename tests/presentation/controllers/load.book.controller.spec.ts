import { LoadBook } from "@/domain/usecases"
import { ok, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse } from "@/presentation/protocols"
import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadBookSpy } from "../mocks"

import faker from "@faker-js/faker"

export class LoadBookController implements Controller {
    constructor (private readonly loadBook: LoadBook) {}

    async handle (request: LoadBookController.Request): Promise<HttpResponse> {
        try {
            const book = await this.loadBook.load({ userId: request.userId, bookId: request.bookId })
            return ok(book)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadBookController {
    export type Request = {
        userId: string
        bookId: string
    }
}

describe('LoadBookController', () => {
    test('should return 500 if LoadBook throws', async () => {
        const loadBookSpy = new LoadBookSpy()
        const sut = new LoadBookController(loadBookSpy)
        const fakeRequest = {
            userId: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        jest.spyOn(loadBookSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
    })

    test('should return book on success', async () => {
        const loadBookSpy = new LoadBookSpy()
        const sut = new LoadBookController(loadBookSpy)
        const fakeRequest = {
            userId: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toBe(loadBookSpy.result)
    })
})
