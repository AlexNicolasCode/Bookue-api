import { BookModel } from "@/domain/models";
import { AddBook } from "@/domain/usecases";
import { Controller, HttpReponse, Validation } from "@/presentation/protocols";
import { mockBookModel } from "tests/domain/mocks";
import { AddBookSpy, ValidationSpy } from "../mocks";

const mockRequest = (): AddBookController.Request => mockBookModel()

export class AddBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addBook: AddBook,
    ) {}

    async handle (request: AddBookController.Request): Promise<HttpReponse> {
        const bookData = {
            ...request,
        }
        await this.validation.validate(bookData)
        return {
            statusCode: 200,
            body: '',
        }
    }
}

export namespace AddBookController {
    export type Request = BookModel
}

describe('AddBookController', () => {
    test('should call Validation with correct values', async () => {
        const validation = new ValidationSpy()
        const addBook = new AddBookSpy()
        const sut = new AddBookController(validation, addBook)
        const request = mockRequest()

        await sut.handle(request)

        expect(validation.input).toStrictEqual(request)
    })
})