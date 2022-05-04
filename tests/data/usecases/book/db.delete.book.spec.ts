import { CheckAccountByAccessTokenRepositorySpy, DeleteBookRepositorySpy } from "../../mocks"
import { mockDeleteBookRequest } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbDeleteBook } from "@/data/usecases"

type SutType = {
    sut: DbDeleteBook
    checkAccountByAccessTokenRepositorySpy: CheckAccountByAccessTokenRepositorySpy
    deleteBookRepositorySpy: DeleteBookRepositorySpy
}

const makeSut = (): SutType => {
    const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
    const deleteBookRepositorySpy = new DeleteBookRepositorySpy()
    const sut = new DbDeleteBook(checkAccountByAccessTokenRepositorySpy, deleteBookRepositorySpy)
    return {
        sut,
        checkAccountByAccessTokenRepositorySpy,
        deleteBookRepositorySpy,
    }
}

describe('DbDeleteBook', () => {
    test('should throws if CheckAccountByAccessTokenRepository throws', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeRequest)
        
        expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessTokenRepository with correct values', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        
        await sut.delete(fakeRequest)
        
        expect(checkAccountByAccessTokenRepositorySpy.accessToken).toBe(fakeRequest.accessToken)
    })

    test('should return undefined if access token is invalid', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockResolvedValueOnce(false)
        
        const result = await sut.delete(fakeRequest)
        
        expect(result).toBeUndefined()
    })

    test('should throws if DeleteBookRepository throws', async () => {
        const { sut, deleteBookRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(deleteBookRepositorySpy, 'delete').mockImplementationOnce(throwError)

        const promise = sut.delete(fakeRequest)

        expect(promise).rejects.toThrowError()
    })
    
    test('should call DeleteBookRepository with correct values', async () => {
        const { sut, deleteBookRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        
        await sut.delete(fakeRequest)
        
        expect(deleteBookRepositorySpy.accessBook).toBe(fakeRequest.accessToken)
        expect(deleteBookRepositorySpy.bookId).toBe(fakeRequest.bookId)
    })
    
    test('should return true on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        
        const result = await sut.delete(fakeRequest)
        
        expect(result).toBe(true)
    })
})