import { serverError } from "@/presentation/helpers"
import { LoadBooksSpy } from "../../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadBooksController } from "@/presentation/controllers"

import faker from "@faker-js/faker"

type SutType = {
    sut: LoadBooksController
    loadBooksSpy: LoadBooksSpy
}

const makeSut = (): SutType => {
    const loadBooksSpy = new LoadBooksSpy()
    const sut = new LoadBooksController(loadBooksSpy)
    return {
        sut,
        loadBooksSpy,
    }
}

describe('LoadBooksController', () => {
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

    test('should return book list on success', async () => {
        const { sut, loadBooksSpy, } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.body).toStrictEqual(loadBooksSpy.result)
    })

    test('should return 204 on success if not have book', async () => {
        const { sut, loadBooksSpy, } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        loadBooksSpy.result = []

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.statusCode).toStrictEqual(204)
    })

    test('should return null on success if not have book', async () => {
        const { sut, loadBooksSpy, } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        loadBooksSpy.result = []

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.body).toBeNull()
    })
})