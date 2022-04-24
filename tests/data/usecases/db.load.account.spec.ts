import { LoadBooksRepository } from "@/data/protocols";
import { LoadBooks } from "@/domain/usecases";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadBooksRepositorySpy } from "../mocks";

import faker from "@faker-js/faker";

class DbLoadBooks implements LoadBooks {
    constructor (private readonly loadBooksRepository: LoadBooksRepository) {}

    async load (userId: string): Promise<LoadBooks.Result> {
        return await this.loadBooksRepository.load(userId)
    }
}

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
        jest.spyOn(loadBooksRepositorySpy, 'load').mockImplementationOnce(throwError)

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