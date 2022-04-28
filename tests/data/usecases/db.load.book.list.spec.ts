import { DbLoadBookList } from "@/data/usecases"
import { throwError } from "tests/domain/mocks/test.helpers"
import { LoadBookListRepositorySpy } from "../mocks"

import faker from "@faker-js/faker"

type SutType = {
    sut: DbLoadBookList
    loadBookListRepositorySpy: LoadBookListRepositorySpy
}

const makeSut = (): SutType => {
    const loadBookListRepositorySpy = new LoadBookListRepositorySpy()
    const sut = new DbLoadBookList(loadBookListRepositorySpy)
    return {
        sut,
        loadBookListRepositorySpy,
    }
}

describe('DbLoadBookList', () => {
    test('should throw if LoadBookListRepository throws', async () => {
        const { sut, loadBookListRepositorySpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()
        jest.spyOn(loadBookListRepositorySpy, 'loadAll').mockImplementationOnce(throwError)

        const promise = sut.load(fakeAccessToken)

        expect(promise).rejects.toThrowError()
    })

    test('should call LoadBookListRepository with correct userId', async () => {
        const { sut, loadBookListRepositorySpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()

        await sut.load(fakeAccessToken)

        expect(loadBookListRepositorySpy.accessToken).toBe(fakeAccessToken)
    })

    test('should return book list on success', async () => {
        const { sut, loadBookListRepositorySpy } = makeSut()
        const fakeAccessToken = faker.datatype.uuid()

        const books = await sut.load(fakeAccessToken)

        expect(books).toBe(loadBookListRepositorySpy.result)
    })
})