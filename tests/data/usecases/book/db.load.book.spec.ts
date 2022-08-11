import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadAccountByTokenRepositorySpy, LoadBookRepositorySpy } from "../../mocks"
import { DbLoadBook } from "@/data/usecases"

import { faker } from "@faker-js/faker"
import { mockAccount } from "tests/domain/mocks"

type SutType = {
    sut: DbLoadBook
    loadBookRepositorySpy: LoadBookRepositorySpy
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutType => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const loadBookRepositorySpy = new LoadBookRepositorySpy()
    const sut = new DbLoadBook(loadAccountByTokenRepositorySpy, loadBookRepositorySpy)
    return {
        sut,
        loadBookRepositorySpy,
        loadAccountByTokenRepositorySpy,
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
        const { sut, loadAccountByTokenRepositorySpy, loadBookRepositorySpy, } = makeSut()
        const fakeData = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        const fakeUser = loadAccountByTokenRepositorySpy.result

        await sut.load(fakeData)

        expect(loadBookRepositorySpy.userId).toBe(fakeUser.id)
    })

    test('should call LoadAccountByTokenRepository with correct accessToken', async () => {
        const { sut, loadAccountByTokenRepositorySpy, loadBookRepositorySpy, } = makeSut()
        const fakeData = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }

        await sut.load(fakeData)

        expect(loadAccountByTokenRepositorySpy.token).toBe(fakeData.accessToken)
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