import { CheckAccountByAccessTokenRepository } from "@/data/protocols";
import { DeleteNote } from "@/domain/usecases";
import { CheckAccountByAccessTokenRepositorySpy } from "tests/data/mocks";
import { mockLoadNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

class DbDeleteNote implements DeleteNote {
    constructor (private readonly checkAccountByAccessToken: CheckAccountByAccessTokenRepository) {}

    async delete (data: DeleteNote.Params): Promise<boolean> {
        await this.checkAccountByAccessToken.checkByAccessToken(data.accessToken)
        return
    }
}

describe('DbDeleteNote', () => {
    test('should throw if CheckAccountByAccessToken throws', async () => {
        const checkAccountByAccessTokenSpy = new CheckAccountByAccessTokenRepositorySpy()
        const sut = new DbDeleteNote(checkAccountByAccessTokenSpy)
        const fakeData = mockLoadNotesParams() 
        jest.spyOn(checkAccountByAccessTokenSpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeData)

        await expect(promise).rejects.toThrowError()
    })
})