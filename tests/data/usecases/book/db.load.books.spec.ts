import { DbLoadBooks } from "@/data/usecases"
import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadAccountByTokenRepositorySpy, LoadBooksRepositorySpy } from "../../mocks"

import faker from "@faker-js/faker"
import { mockUserModel } from "tests/domain/mocks"

type SutType = {
    sut: DbLoadBooks
    loadBooksRepositorySpy: LoadBooksRepositorySpy
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutType => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const loadBooksRepositorySpy = new LoadBooksRepositorySpy()
    const sut = new DbLoadBooks(loadAccountByTokenRepositorySpy, loadBooksRepositorySpy)
    return {
        sut,
        loadBooksRepositorySpy,
        loadAccountByTokenRepositorySpy,
    }
}

describe('DbLoadBooks', () => {
    test('should throw if LoadBooksRepository throws', async () => {
        const { sut, loadBooksRepositorySpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        jest.spyOn(loadBooksRepositorySpy, 'loadAll').mockImplementationOnce(throwError)

        const promise = sut.load(fakeAccessToken)

        expect(promise).rejects.toThrowError()
    })

    test('should call LoadBooksRepository with correct userId', async () => {
        const { sut, loadAccountByTokenRepositorySpy, loadBooksRepositorySpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        const fakeUserId = mockUserModel()
        loadAccountByTokenRepositorySpy.result = fakeUserId

        await sut.load(fakeAccessToken)

        expect(loadBooksRepositorySpy.userId).toBe(fakeUserId.id)
    })

    test('should return book list on success', async () => {
        const { sut, loadBooksRepositorySpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()

        const books = await sut.load(fakeAccessToken)

        expect(books).toBe(loadBooksRepositorySpy.result)
    })
})