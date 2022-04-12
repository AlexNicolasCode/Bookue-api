import { BookModel } from "@/domain/models";
import { AddBook } from "@/domain/usecases";
import { badRequest, noContent, serverError } from "@/presentation/helpers";
import { Controller, HttpReponse, Validation } from "@/presentation/protocols";
import { mockBookModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { AddBookSpy, ValidationSpy } from "../mocks";

import MockDate from 'mockdate';

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
            return noContent()
        } catch (e) {
            return serverError(e)
        }
    }
}

export namespace AddBookController {
    export type Request = BookModel
}

describe('AddBookController', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('should call Validation with correct values', async () => {
        const { sut, validation } = makeSut()
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(validation.input).toStrictEqual(request)
    })
    
    test('should return 400 if Validation fails', async () => {
        const { sut, validation } = makeSut()
        validation.error = new Error()
        const request = mockRequest()

        const httpResponse = await sut.handle(request)

        expect(httpResponse).toEqual(badRequest(validation.error))
    })
    
    test('should call AddBook with correct values', async () => {
        const { sut, addBook } = makeSut()
        const request = mockRequest()

        await sut.handle(request)

        expect(addBook.params).toEqual({ ...request, created_at: new Date() })
    })
    
    test('should return 500 if AddBook fails', async () => {
        const { sut, addBook } = makeSut()
        jest.spyOn(addBook, 'add').mockImplementationOnce(throwError)
        const request = mockRequest()

        const httpResponse = await sut.handle(request)

        expect(httpResponse).toEqual(serverError(new Error()))
    })
    
    test('should return noContent on success', async () => {
        const { sut } = makeSut()
        const request = mockRequest()

        const httpResponse = await sut.handle(request)

        expect(httpResponse).toEqual(noContent())
    })
})