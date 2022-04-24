import { LoadBooksRepository } from "@/data/protocols";
import { LoadBooks } from "@/domain/usecases";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadBooksRepositorySpy } from "../mocks";

class DbLoadBooks implements LoadBooks {
    constructor (private readonly loadBooksRepository: LoadBooksRepository) {}

    async load (userId: string): Promise<LoadBooks.Result> {
        await this.loadBooksRepository.load(userId)
        return
    }
}

describe('DbLoadBooks', () => {
    test('should throw if LoadBooksRepository throws', async () => {
        const loadBooksRepositorySpy = new LoadBooksRepositorySpy()
        const sut = new DbLoadBooks(loadBooksRepositorySpy)
        const fakeUserId = '100'
        jest.spyOn(loadBooksRepositorySpy, 'load').mockImplementationOnce(throwError)

        const promise = sut.load(fakeUserId)

        expect(promise).rejects.toThrowError()
    })
})