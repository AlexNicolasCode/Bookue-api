import { CheckAccountByAccessTokenRepository, LoadNotesRepository } from "@/data/protocols";
import { NoteResultModel } from "@/domain/models";
import faker from "@faker-js/faker";
import { throwError } from "tests/domain/mocks/test.helpers";
import { CheckAccountByAccessTokenRepositorySpy, LoadNotesRepositorySpy } from "../mocks";

export class DbLoadNotes implements LoadNotesRepository {
    constructor (
        private readonly checkAccountByAccessToken: CheckAccountByAccessTokenRepository,
        private readonly loadNotesRepository: LoadNotesRepository,
    ) {}

    async loadAll (data: LoadNotesRepository.Params): Promise<NoteResultModel[]> {
        const hasAccount = await this.checkAccountByAccessToken.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            return this.loadNotesRepository.loadAll(data)
        }
    }
}

const mockRequest = (): LoadNotesRepository.Params => ({
    accessToken: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
})

describe('DbLoadNotes', () => {
    test('should throw if CheckAccountByAccessToken throws', async () => {
        const checkAccountByAccessTokenSpy = new CheckAccountByAccessTokenRepositorySpy()
        const loadNotesRepositorySpy = new LoadNotesRepositorySpy()
        const sut = new DbLoadNotes(checkAccountByAccessTokenSpy, loadNotesRepositorySpy)
        jest.spyOn(checkAccountByAccessTokenSpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        const fakeRequest = mockRequest()

        const promise = sut.loadAll(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })

    test('should throw if LoadNotesRepository throws', async () => {
        const checkAccountByAccessTokenSpy = new CheckAccountByAccessTokenRepositorySpy()
        const loadNotesRepositorySpy = new LoadNotesRepositorySpy()
        const sut = new DbLoadNotes(checkAccountByAccessTokenSpy, loadNotesRepositorySpy)
        jest.spyOn(loadNotesRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
        const fakeRequest = mockRequest()

        const promise = sut.loadAll(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })
})