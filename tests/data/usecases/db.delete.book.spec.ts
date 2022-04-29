import { DeleteBook } from "@/domain/usecases"
import { CheckAccountByAccessTokenRepository } from "@/data/protocols"
import { CheckAccountByAccessTokenRepositorySpy } from "../mocks"
import { mockDeleteBookRequest } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"

export class DbDeleteBook implements DeleteBook {
    constructor (private readonly checkAccountByAccessTokenRepository: CheckAccountByAccessTokenRepository) {}

    async delete (data: DeleteBook.Params): Promise<boolean> {
        const hasAccount = await this.checkAccountByAccessTokenRepository.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            return true
        }
    }
}

describe('DbDeleteBook', () => {
    test('should throws if CheckAccountByAccessTokenRepository throws', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const sut = new DbDeleteBook(checkAccountByAccessTokenRepositorySpy)
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)

        const promise = sut.delete(fakeRequest)

        expect(promise).rejects.toThrowError()
    })
})