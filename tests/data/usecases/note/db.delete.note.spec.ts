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

type SutType = {
    sut: DbDeleteNote
    checkAccountByAccessTokenRepositorySpy: CheckAccountByAccessTokenRepositorySpy
}

const makeSut = (): SutType => {
    const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
    const sut = new DbDeleteNote(checkAccountByAccessTokenRepositorySpy)
    return {
        sut,
        checkAccountByAccessTokenRepositorySpy,
    }
} 

describe('DbDeleteNote', () => {
    test('should throw if CheckAccountByAccessToken throws', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeData = mockLoadNotesParams() 
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeData)

        await expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessToken with correct values', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeData = mockLoadNotesParams() 
        
        await sut.delete(fakeData)

        expect(checkAccountByAccessTokenRepositorySpy.accessToken).toBe(fakeData.accessToken)
    })
})