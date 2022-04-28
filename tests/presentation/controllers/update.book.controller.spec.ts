import { UpdateBookController } from "@/presentation/controllers"
import { InvalidParamError, ServerError } from "@/presentation/errors"
import { serverError } from "@/presentation/helpers"
import { CheckAccountByAccessTokenRepositorySpy } from "tests/data/mocks"
import { mockUpdateBookRequest } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { UpdateBookSpy, ValidationSpy } from "../mocks"

type SutType = {
    sut: UpdateBookController
    validationSpy: ValidationSpy
    updateBookSpy: UpdateBookSpy
    checkAccountByAccessToken: CheckAccountByAccessTokenRepositorySpy
}

const makeSut = (): SutType => {
    const checkAccountByAccessToken = new CheckAccountByAccessTokenRepositorySpy()
    const validationSpy = new ValidationSpy()
    const updateBookSpy = new UpdateBookSpy()
    const sut = new UpdateBookController(checkAccountByAccessToken, validationSpy, updateBookSpy)
    return {
        sut,
        validationSpy,
        updateBookSpy,
        checkAccountByAccessToken,
    }
}

describe('UpdateBookController', () => {
    test('should return 500 if Validation throws', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
    })

    test('should return Error on body if Validation throws', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })

    test('should return 400 if Validation returns error', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(400)
    })

    test('should return Error on body if Validation returns error', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return 500 if UpdateBook throws', async () => {
        const { sut, updateBookSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        jest.spyOn(updateBookSpy, 'update').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(500)
    })

    test('should return ServerError on body if UpdateBook throws', async () => {
        const { sut, updateBookSpy, } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 
        jest.spyOn(updateBookSpy, 'update').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toStrictEqual(new ServerError(new Error().stack))
    })

    test('should return 204 on status code on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(204)
    })

    test('should return null on body on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = mockUpdateBookRequest() 

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toBeNull()
    })

    test('should return 500 on status code if checkAccountByAccessToken throws', async () => {
        const { sut, checkAccountByAccessToken, } = makeSut()
        const fakeRequest = mockUpdateBookRequest()
        jest.spyOn(checkAccountByAccessToken, 'checkByAccessToken').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(500)
    })

    test('should return ServerError on body if checkAccountByAccessToken throws', async () => {
        const { sut, checkAccountByAccessToken, } = makeSut()
        const fakeRequest = mockUpdateBookRequest()
        jest.spyOn(checkAccountByAccessToken, 'checkByAccessToken').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toStrictEqual(new ServerError(new Error().stack))
    })

    test('should return 403 on status code if checkAccountByAccessToken returns false', async () => {
        const { sut, checkAccountByAccessToken, } = makeSut()
        const fakeRequest = mockUpdateBookRequest()
        jest.spyOn(checkAccountByAccessToken, 'checkByAccessToken').mockResolvedValueOnce(false)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(403)
    })

    test('should return InvalidParamError on body if checkAccountByAccessToken returns false', async () => {
        const { sut, checkAccountByAccessToken, } = makeSut()
        const fakeRequest = mockUpdateBookRequest()
        jest.spyOn(checkAccountByAccessToken, 'checkByAccessToken').mockResolvedValueOnce(false)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toStrictEqual(new InvalidParamError('accessToken'))
    })
})