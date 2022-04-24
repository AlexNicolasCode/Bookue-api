import { LoadBookRepository } from "@/data/protocols";
import { LoadBook } from "@/domain/usecases";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadBookRepositorySpy } from "../mocks";

import faker from "@faker-js/faker";

export class DbLoadBook implements LoadBook {
    constructor (private readonly loadBookRepository: LoadBookRepository) {}

    async load (data: LoadBook.Request): Promise<LoadBook.Result> {
        return await this.loadBookRepository.load(data)
    }
}

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
            userId: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        jest.spyOn(loadBookRepositorySpy, 'load').mockImplementationOnce(throwError)

        const promise = sut.load(fakeData)

        expect(promise).rejects.toThrowError()
    })

    test('should call LoadBookRepository with correct bookId', async () => {
        const { sut, loadBookRepositorySpy, } = makeSut()
        const fakeData = {
            userId: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }

        await sut.load(fakeData)

        expect(loadBookRepositorySpy.bookId).toBe(fakeData.bookId)
    })
})