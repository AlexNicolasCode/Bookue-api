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