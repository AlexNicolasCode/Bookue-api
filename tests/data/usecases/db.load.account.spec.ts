import { LoadBooksRepository } from "@/data/protocols";
import { LoadBooks } from "@/domain/usecases";
import faker from "@faker-js/faker";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadBooksRepositorySpy } from "../mocks";

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
})