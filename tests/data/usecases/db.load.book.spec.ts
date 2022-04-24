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

describe('DbLoadBook', () => {
    test('should throw if loadBookRepository throws', async () => {
        const loadBookRepository = new LoadBookRepositorySpy()
        const sut = new DbLoadBook(loadBookRepository)
        const fakeData = {
            userId: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
        jest.spyOn(loadBookRepository, 'load').mockImplementationOnce(throwError)

        const promise = sut.load(fakeData)

        expect(promise).rejects.toThrowError()
    })
})