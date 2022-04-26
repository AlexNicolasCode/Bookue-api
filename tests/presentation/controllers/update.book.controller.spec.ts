import { UpdateBook } from "@/domain/usecases"
import { badRequest, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse, Validation } from "@/presentation/protocols"
import { mockUpdateBookRequest } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { UpdateBookSpy, ValidationSpy } from "../mocks"

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
        } catch (error) {
            return serverError(error)
        }
    }
}

describe('UpdateBookController', () => {
    test('should return 500 if Validation throws', async () => {
        const validationSpy = new ValidationSpy()
        const updateBookSpy = new UpdateBookSpy()
        const sut = new UpdateBookController(validationSpy, updateBookSpy)
        const fakeRequest = mockUpdateBookRequest() 
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
    })

    test('should return Error on body if Validation throws', async () => {
        const validationSpy = new ValidationSpy()
        const updateBookSpy = new UpdateBookSpy()
        const sut = new UpdateBookController(validationSpy, updateBookSpy)
        const fakeRequest = mockUpdateBookRequest() 
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })

    test('should return 400 if Validation returns error', async () => {
        const validationSpy = new ValidationSpy()
        const updateBookSpy = new UpdateBookSpy()
        const sut = new UpdateBookController(validationSpy, updateBookSpy)
        const fakeRequest = mockUpdateBookRequest() 
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(400)
    })

    test('should return Error on body if Validation returns error', async () => {
        const validationSpy = new ValidationSpy()
        const updateBookSpy = new UpdateBookSpy()
        const sut = new UpdateBookController(validationSpy, updateBookSpy)
        const fakeRequest = mockUpdateBookRequest() 
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return Error on body if Validation returns error', async () => {
        const validationSpy = new ValidationSpy()
        const updateBookSpy = new UpdateBookSpy()
        const sut = new UpdateBookController(validationSpy, updateBookSpy)
        const fakeRequest = mockUpdateBookRequest() 
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toStrictEqual(new Error())
    })
})