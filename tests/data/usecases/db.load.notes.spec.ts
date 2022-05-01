import { CheckAccountByAccessTokenRepository, LoadNotesRepository } from "@/data/protocols";
import { NoteResultModel } from "@/domain/models";
import faker from "@faker-js/faker";
import { throwError } from "tests/domain/mocks/test.helpers";
import { CheckAccountByAccessTokenRepositorySpy } from "../mocks";

export class DbLoadNotes implements LoadNotesRepository {
    constructor (private readonly checkAccountByAccessToken: CheckAccountByAccessTokenRepository) {}

    async loadAll (data: LoadNotesRepository.Params): Promise<NoteResultModel> {
        const hasAccount = await this.checkAccountByAccessToken.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            return
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
        const sut = new DbLoadNotes(checkAccountByAccessTokenSpy)
        jest.spyOn(checkAccountByAccessTokenSpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        const fakeRequest = mockRequest()

        const promise = sut.loadAll(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })
})