import { DeleteBookRepositorySpy, LoadAccountByTokenRepositorySpy } from "../../mocks"
import { mockDeleteBookParams } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbDeleteBook } from "@/data/usecases"

type SutType = {
    sut: DbDeleteBook
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
    deleteBookRepositorySpy: DeleteBookRepositorySpy
}

const makeSut = (): SutType => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const deleteBookRepositorySpy = new DeleteBookRepositorySpy()
    const sut = new DbDeleteBook(loadAccountByTokenRepositorySpy, deleteBookRepositorySpy)
    return {
        sut,
        loadAccountByTokenRepositorySpy,
        deleteBookRepositorySpy,
    }
}

describe('DbDeleteBook', () => {
    test('should throws if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookParams()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeRequest)
        
        expect(promise).rejects.toThrowError()
    })

    test('should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookParams()
        
        await sut.delete(fakeRequest)
        
        expect(loadAccountByTokenRepositorySpy.token).toBe(fakeRequest.accessToken)
    })

    test('should return undefined if access token is invalid', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookParams()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockResolvedValueOnce(undefined)
        
        const result = await sut.delete(fakeRequest)
        
        expect(result).toBe(false)
    })

    test('should throws if DeleteBookRepository throws', async () => {
        const { sut, deleteBookRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookParams()
        jest.spyOn(deleteBookRepositorySpy, 'delete').mockImplementationOnce(throwError)

        const promise = sut.delete(fakeRequest)

        expect(promise).rejects.toThrowError()
    })
    
    test('should call DeleteBookRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy, deleteBookRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookParams()
        const fakeAccount = loadAccountByTokenRepositorySpy.result
        
        await sut.delete(fakeRequest)
        
        expect(deleteBookRepositorySpy.userId).toBe(fakeAccount.id)
        expect(deleteBookRepositorySpy.bookId).toBe(fakeRequest.bookId)
    })
    
    test('should return true on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = mockDeleteBookParams()
        
        const result = await sut.delete(fakeRequest)
        
        expect(result).toBe(true)
    })
})