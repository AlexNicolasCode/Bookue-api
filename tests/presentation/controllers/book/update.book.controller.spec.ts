import { UpdateBookController } from "@/presentation/controllers"
import { forbidden, serverError } from "@/presentation/helpers"
import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadAccountByTokenSpy, UpdateBookSpy, ValidationSpy } from "../../mocks"
import { faker } from "@faker-js/faker"
import { InvalidParamError } from "@/presentation/errors"

const mockRequest = (): UpdateBookController.Params => ({
    title: faker.datatype.string(),
    author: faker.datatype.string(),
    description: faker.datatype.string(),
    currentPage: faker.datatype.number(),
    pages: faker.datatype.number(),
    accessToken: faker.datatype.string(),
    bookId: faker.datatype.string(),
})

type SutType = {
    sut: UpdateBookController
    validationSpy: ValidationSpy
    updateBookSpy: UpdateBookSpy
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const updateBookSpy = new UpdateBookSpy()
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const sut = new UpdateBookController(
        validationSpy,
        updateBookSpy,
        loadAccountByTokenSpy,
    )
    return {
        sut,
        validationSpy,
        updateBookSpy,
        loadAccountByTokenSpy,
    }
}

describe('UpdateBookController', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 500 if Validation throws', async () => {
        const { sut, validationSpy, } = makeSut()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })

    test('should return 400 if Validation returns error', async () => {
        const { sut, validationSpy, } = makeSut()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return 403 if account not found', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        loadAccountByTokenSpy.result = undefined

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(403)
        expect(httpResponse.body).toStrictEqual(forbidden(new InvalidParamError('accessToken')))
    })

    test('should return 500 if UpdateBook throws', async () => {
        const { sut, updateBookSpy, } = makeSut()
        jest.spyOn(updateBookSpy, 'update').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(500)
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(204)
        expect(httpResponse.body).toBeNull()
    })
})