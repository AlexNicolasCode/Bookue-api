import { serverError } from "@/presentation/helpers"
import { LoadBookListSpy } from "../../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadBookListController } from "@/presentation/controllers"

import faker from "@faker-js/faker"

type SutType = {
    sut: LoadBookListController
    loadBookListSpy: LoadBookListSpy
}

const makeSut = (): SutType => {
    const loadBookListSpy = new LoadBookListSpy()
    const sut = new LoadBookListController(loadBookListSpy)
    return {
        sut,
        loadBookListSpy,
    }
}

describe('LoadBookListController', () => {
    test('should return 500 if LoadBookList throws', async () => {
        const { sut, loadBookListSpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        jest.spyOn(loadBookListSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.statusCode).toStrictEqual(500)
    })

    test('should return error on body if LoadBookList throws', async () => {
        const { sut, loadBookListSpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        jest.spyOn(loadBookListSpy, 'load').mockImplementationOnce(throwError)

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
        const { sut, loadBookListSpy, } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.body).toStrictEqual(loadBookListSpy.result)
    })

    test('should return 204 on success if not have book', async () => {
        const { sut, loadBookListSpy, } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        loadBookListSpy.result = []

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.statusCode).toStrictEqual(204)
    })

    test('should return null on success if not have book', async () => {
        const { sut, loadBookListSpy, } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        loadBookListSpy.result = []

        const httpResponse = await sut.handle({ accessToken: fakeAccessToken })

        expect(httpResponse.body).toBeNull()
    })
})