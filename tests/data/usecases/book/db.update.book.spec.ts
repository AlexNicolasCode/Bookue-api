import { LoadAccountByTokenRepositorySpy, UpdateBookRepositorySpy } from "../../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbUpdateBook } from "@/data/usecases"
import { mockUpdateBookRequest, mockAccount } from "tests/domain/mocks"

type SutType = {
    sut: DbUpdateBook
    updateBookRepositorySpy: UpdateBookRepositorySpy
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutType => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const updateBookRepositorySpy = new UpdateBookRepositorySpy()
    const sut = new DbUpdateBook(loadAccountByTokenRepositorySpy, updateBookRepositorySpy)
    return {
        sut,
        updateBookRepositorySpy,
        loadAccountByTokenRepositorySpy,
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
        const { sut, loadAccountByTokenRepositorySpy, updateBookRepositorySpy } = makeSut()
        const fakeBook = mockUpdateBookRequest()
        const fakeUser = loadAccountByTokenRepositorySpy.result

        await sut.update(fakeBook)

        expect(updateBookRepositorySpy.params).toStrictEqual({
            author: fakeBook.author,
            title: fakeBook.title,
            description: fakeBook.description,
            pages: fakeBook.pages,
            currentPage: fakeBook.currentPage,
            userId: fakeUser.id,
            bookId: fakeBook.bookId,
        })
    })

    test('should return true on success', async () => {
        const { sut } = makeSut()
        const fakeBook = mockUpdateBookRequest() 

        const result = await sut.update(fakeBook)

        expect(result).toBe(true)
    })

    test('should return undefined if LoadAccountByTokenRepository returns account', async () => {
        const { sut } = makeSut()
        const fakeBook = mockUpdateBookRequest()

        const result = await sut.update(fakeBook)

        expect(result).toBe(true)
    })

    test('should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeBook = mockUpdateBookRequest()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)

        const promise = sut.update(fakeBook)

        expect(promise).rejects.toThrowError()
    })

    test('should return false if not found account', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeBook = mockUpdateBookRequest()
        loadAccountByTokenRepositorySpy.result = undefined

        const result = await sut.update(fakeBook)

        expect(result).toBe(false)
    })
})