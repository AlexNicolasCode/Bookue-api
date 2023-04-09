import { UpdateBookRepositorySpy } from "../../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbUpdateBook } from "@/data/usecases"
import { mockUpdateBookRequest, mockAccount } from "tests/domain/mocks"

type SutType = {
    sut: DbUpdateBook
    updateBookRepositorySpy: UpdateBookRepositorySpy
}

const makeSut = (): SutType => {
    const updateBookRepositorySpy = new UpdateBookRepositorySpy()
    const sut = new DbUpdateBook(updateBookRepositorySpy)
    return {
        sut,
        updateBookRepositorySpy,
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

        expect(updateBookRepositorySpy.params).toStrictEqual({
            author: fakeBook.author,
            title: fakeBook.title,
            description: fakeBook.description,
            pages: fakeBook.pages,
            currentPage: fakeBook.currentPage,
            userId: fakeBook.userId,
            bookId: fakeBook.bookId,
        })
    })
})