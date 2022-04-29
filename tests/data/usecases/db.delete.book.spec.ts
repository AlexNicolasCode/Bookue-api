import { DeleteBook } from "@/domain/usecases"
import { CheckAccountByAccessTokenRepository, DeleteBookRepository } from "@/data/protocols"
import { CheckAccountByAccessTokenRepositorySpy, DeleteBookRepositorySpy } from "../mocks"
import { mockDeleteBookRequest } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"

export class DbDeleteBook implements DeleteBook {
    constructor (
        private readonly checkAccountByAccessTokenRepository: CheckAccountByAccessTokenRepository,
        private readonly deleteBookRepository: DeleteBookRepository,
    ) {}

    async delete (data: DeleteBook.Params): Promise<boolean> {
        const hasAccount = await this.checkAccountByAccessTokenRepository.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            await this.deleteBookRepository.delete(data)
            return true
        }
    }
}

describe('DbDeleteBook', () => {
    test('should throws if CheckAccountByAccessTokenRepository throws', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const deleteBookRepositorySpy = new DeleteBookRepositorySpy()
        const sut = new DbDeleteBook(checkAccountByAccessTokenRepositorySpy, deleteBookRepositorySpy)
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeRequest)
        
        expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessTokenRepository with correct values', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const deleteBookRepositorySpy = new DeleteBookRepositorySpy()
        const sut = new DbDeleteBook(checkAccountByAccessTokenRepositorySpy, deleteBookRepositorySpy)
        const fakeRequest = mockDeleteBookRequest()
        
        await sut.delete(fakeRequest)
        
        expect(checkAccountByAccessTokenRepositorySpy.accessToken).toBe(fakeRequest.accessToken)
    })

    test('should throws if DeleteBookRepository throws', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const deleteBookRepositorySpy = new DeleteBookRepositorySpy()
        const sut = new DbDeleteBook(checkAccountByAccessTokenRepositorySpy, deleteBookRepositorySpy)
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(deleteBookRepositorySpy, 'delete').mockImplementationOnce(throwError)

        const promise = sut.delete(fakeRequest)

        expect(promise).rejects.toThrowError()
    })
})