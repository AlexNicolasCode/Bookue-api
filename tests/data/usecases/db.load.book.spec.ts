import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadBookRepositorySpy } from "../mocks"
import { DbLoadBook } from "@/data/usecases"

import faker from "@faker-js/faker"

type SutType = {
    sut: DbLoadBook
    loadBookRepositorySpy: LoadBookRepositorySpy
}

const makeSut = (): SutType => {
    const loadBookRepositorySpy = new LoadBookRepositorySpy()
    const sut = new DbLoadBook(loadBookRepositorySpy)
    return {
        sut,
        loadBookRepositorySpy,
    }
}

describe('DbLoadBook', () => {
    test('should throw if loadBookRepository throws', async () => {
        const { sut, loadBookRepositorySpy, } = makeSut()
        const fakeData = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        jest.spyOn(loadBookRepositorySpy, 'loadOne').mockImplementationOnce(throwError)

        const promise = sut.load(fakeData)

        expect(promise).rejects.toThrowError()
    })

    test('should call LoadBookRepository with correct bookId', async () => {
        const { sut, loadBookRepositorySpy, } = makeSut()
        const fakeData = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }

        await sut.load(fakeData)

        expect(loadBookRepositorySpy.bookId).toBe(fakeData.bookId)
    })

    test('should call LoadBookRepository with correct userId', async () => {
        const { sut, loadBookRepositorySpy, } = makeSut()
        const fakeData = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }

        await sut.load(fakeData)

        expect(loadBookRepositorySpy.accessToken).toBe(fakeData.accessToken)
    })

    test('should return a book on success', async () => {
        const { sut, loadBookRepositorySpy, } = makeSut()
        const fakeData = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }

        const book = await sut.load(fakeData)

        expect(book).toBe(loadBookRepositorySpy.result)
    })
})