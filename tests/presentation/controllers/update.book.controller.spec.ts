import { UpdateBookController } from "@/presentation/controllers"
import { InvalidParamError, ServerError } from "@/presentation/errors"
import { serverError } from "@/presentation/helpers"
import { mockUpdateBookRequest } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { UpdateBookSpy, ValidationSpy } from "../mocks"

type SutType = {
    sut: UpdateBookController
    validationSpy: ValidationSpy
    updateBookSpy: UpdateBookSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const updateBookSpy = new UpdateBookSpy()
    const sut = new UpdateBookController(validationSpy, updateBookSpy)
    return {
        sut,
        validationSpy,
        updateBookSpy,
    }
}

describe('UpdateBookController', () => {
    test('should return 500 if Validation throws', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })

    test('should return 400 if Validation returns error', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return 500 if UpdateBook throws', async () => {
        const { sut, updateBookSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        jest.spyOn(updateBookSpy, 'update').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(500)
        expect(httpResponse.body).toStrictEqual(new ServerError(new Error().stack))
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(204)
        expect(httpResponse.body).toBeNull()
    })
})