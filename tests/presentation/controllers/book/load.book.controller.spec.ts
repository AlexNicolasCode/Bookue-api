import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadBookSpy } from "../../mocks"
import { LoadBookController } from "@/presentation/controllers"

import faker from "@faker-js/faker"

type SutType = {
    sut: LoadBookController
    loadBookSpy: LoadBookSpy
}

const makeSut = (): SutType => {
    const loadBookSpy = new LoadBookSpy()
    const sut = new LoadBookController(loadBookSpy)
    return {
        sut,
        loadBookSpy,
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
