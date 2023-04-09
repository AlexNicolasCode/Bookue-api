import { faker } from "@faker-js/faker"

import { LoadAccountByTokenSpy, LoadBookSpy } from "../../mocks"
import { LoadBookController } from "@/presentation/controllers"
import { AccessDeniedError } from "@/presentation/errors"
import { forbidden } from "@/presentation/helpers"

import { throwError } from "tests/domain/mocks/test.helpers"

type SutType = {
    sut: LoadBookController
    loadBookSpy: LoadBookSpy
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutType => {
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const loadBookSpy = new LoadBookSpy()
    const sut = new LoadBookController(
        loadAccountByTokenSpy,
        loadBookSpy,
    )
    return {
        sut,
        loadBookSpy,
        loadAccountByTokenSpy,
    }
}

describe('LoadBookController', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 500 if LoadBook throws', async () => {
        const { sut, loadBookSpy } = makeSut()
        const fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        jest.spyOn(loadBookSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
    })

    test('should return 403 when account is not found', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        const fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        loadAccountByTokenSpy.result = undefined

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(forbidden(new AccessDeniedError()))
    })

    test('should return 200 on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(200)
    })

    test('should return book on success', async () => {
        const { sut, loadBookSpy } = makeSut()
        const fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toBe(loadBookSpy.result)
    })

    test('should return 204 if not found book', async () => {
        const { sut, loadBookSpy } = makeSut()
        const fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        loadBookSpy.result = null

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(204)
    })

    test('should return null on boby if not found book', async () => {
        const { sut, loadBookSpy } = makeSut()
        const fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        loadBookSpy.result = null

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body).toBeNull()
    })
})
