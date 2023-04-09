import { serverError } from "@/presentation/helpers"
import { LoadAccountByTokenSpy, LoadBooksSpy } from "../../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadBooksController } from "@/presentation/controllers"

import { faker } from "@faker-js/faker"

type SutType = {
    sut: LoadBooksController
    loadBooksSpy: LoadBooksSpy
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutType => {
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const loadBooksSpy = new LoadBooksSpy()
    const sut = new LoadBooksController(
        loadAccountByTokenSpy,
        loadBooksSpy,
    )
    return {
        sut,
        loadBooksSpy,
        loadAccountByTokenSpy,
    }
}

describe('LoadBooksController', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 500 if loadBooks throws', async () => {
        const { sut, loadBooksSpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        jest.spyOn(loadBooksSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.statusCode).toStrictEqual(500)
    })

    test('should return error on body if loadBooks throws', async () => {
        const { sut, loadBooksSpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        jest.spyOn(loadBooksSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.body).toStrictEqual(serverError(new Error).body)
    })

    test('should return 200 on success', async () => {
        const { sut } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.statusCode).toStrictEqual(200)
    })

    test('should return 403 when user not found', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        loadAccountByTokenSpy.result = undefined

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.statusCode).toStrictEqual(403)
    })

    test('should return book list on success', async () => {
        const { sut, loadBooksSpy, } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.body).toStrictEqual(loadBooksSpy.result)
    })

    test('should return null on success if not have book', async () => {
        const { sut, loadBooksSpy, } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        loadBooksSpy.result = []

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.body).toStrictEqual([])
    })
})