import { DbLoadBooks } from "@/data/usecases"
import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadBooksRepositorySpy } from "../../mocks"

import { faker } from "@faker-js/faker"

type SutType = {
    sut: DbLoadBooks
    loadBooksRepositorySpy: LoadBooksRepositorySpy
}

const makeSut = (): SutType => {
    const loadBooksRepositorySpy = new LoadBooksRepositorySpy()
    const sut = new DbLoadBooks(loadBooksRepositorySpy)
    return {
        sut,
        loadBooksRepositorySpy,
    }
}

describe('DbLoadBooks', () => {
    test('should throw if LoadBooksRepository throws', async () => {
        const { sut, loadBooksRepositorySpy } = makeSut()
        const fakeUserId = faker.datatype.uuid()
        jest.spyOn(loadBooksRepositorySpy, 'loadAll').mockImplementationOnce(throwError)

        const promise = sut.load(fakeUserId)

        expect(promise).rejects.toThrowError()
    })

    test('should call LoadBooksRepository with correct userId', async () => {
        const { sut, loadBooksRepositorySpy } = makeSut()
        const fakeUserId = faker.datatype.uuid()

        await sut.load(fakeUserId)

        expect(loadBooksRepositorySpy.userId).toBe(fakeUserId)
    })

    test('should return book list on success', async () => {
        const { sut, loadBooksRepositorySpy } = makeSut()
        const fakeUserId = faker.datatype.uuid()

        const books = await sut.load(fakeUserId)

        expect(books).toBe(loadBooksRepositorySpy.result)
    })
})