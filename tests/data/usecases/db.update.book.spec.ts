import { CheckAccountByAccessTokenRepositorySpy, UpdateBookRepositorySpy } from "../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbUpdateBook } from "@/data/usecases"
import { mockUpdateBookRequest } from "tests/domain/mocks"

type SutType = {
    sut: DbUpdateBook
    updateBookRepositorySpy: UpdateBookRepositorySpy
    checkAccountByAccessTokenRepositorySpy: CheckAccountByAccessTokenRepositorySpy
}

const makeSut = (): SutType => {
    const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
    const updateBookRepositorySpy = new UpdateBookRepositorySpy()
    const sut = new DbUpdateBook(checkAccountByAccessTokenRepositorySpy, updateBookRepositorySpy)
    return {
        sut,
        updateBookRepositorySpy,
        checkAccountByAccessTokenRepositorySpy,
    }
}

describe('DbUpdateBook', () => {
    test('should throw if UpdateBookRepository throws', async () => {
        const { sut, updateBookRepositorySpy } = makeSut()
        const fakeBook = mockUpdateBookRequest()   
        jest.spyOn(updateBookRepositorySpy, 'update').mockImplementationOnce(throwError)     

        const promise = sut.update(fakeBook)

        expect(promise).rejects.toThrowError()
    })

    test('should call UpdateBookRepository with correct values', async () => {
        const { sut, updateBookRepositorySpy } = makeSut()
        const fakeBook = mockUpdateBookRequest()   

        await sut.update(fakeBook)

        expect(updateBookRepositorySpy.params).toBe(fakeBook)
    })

    test('should return true on success', async () => {
        const { sut } = makeSut()
        const fakeBook = mockUpdateBookRequest() 

        const result = await sut.update(fakeBook)

        expect(result).toBe(true)
    })

    test('should return undefined if CheckAccountByAccessTokenRepository returns false', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeBook = mockUpdateBookRequest()
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockResolvedValueOnce(false)

        const result = await sut.update(fakeBook)

        expect(result).toBeUndefined()
    })

    test('should throw if CheckAccountByAccessTokenRepository throws', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeBook = mockUpdateBookRequest()
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)

        const promise = sut.update(fakeBook)

        expect(promise).rejects.toThrowError()
    })
})