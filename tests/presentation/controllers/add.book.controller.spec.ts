import { BookModel } from "@/domain/models";
import { AddBook } from "@/domain/usecases";
import { badRequest } from "@/presentation/helpers";
import { Controller, HttpReponse, Validation } from "@/presentation/protocols";
import { mockBookModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { AddBookSpy, ValidationSpy } from "../mocks";

const mockRequest = (): AddBookController.Request => mockBookModel()

type SutType = {
    sut: AddBookController
    addBook: AddBookSpy
    validation: ValidationSpy
}

const makeSut = (): SutType => {
    const validation = new ValidationSpy()
    const addBook = new AddBookSpy()
    const sut = new AddBookController(validation, addBook)
    return {
        sut,
        addBook,
        validation,
    }
}

export class AddBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addBook: AddBook,
    ) {}

    async handle (request: AddBookController.Request): Promise<HttpReponse> {
        const bookData = {
            ...request,
        }
        const error = await this.validation.validate(bookData)
        if (error) {
            return badRequest(error)
        }
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
        const { sut, validation } = makeSut()
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(validation.input).toStrictEqual(request)
    })
    
    test('should return 400 if Validation fails', async () => {
        const { sut, validation } = makeSut()
        jest.spyOn(validation, 'validate').mockImplementationOnce(throwError)
        const request = mockRequest()

        const promise = sut.handle(request)

        expect(promise).rejects.toThrowError()
    })
})