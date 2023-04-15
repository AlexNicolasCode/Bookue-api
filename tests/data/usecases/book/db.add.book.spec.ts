import { DbAddBook } from "@/data/usecases"
import { mockAddBookParams } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { AddBookRepositorySpy } from "../../mocks"

type SutTypes = {
    sut: DbAddBook
    addBookRepositorySpy: AddBookRepositorySpy
}

const makeSut = (): SutTypes => {
    const addBookRepositorySpy = new AddBookRepositorySpy()
    const sut = new DbAddBook(addBookRepositorySpy)
    return {
        sut,
        addBookRepositorySpy,
    }
}

describe('DbAddBook', () => {
    test('should call AddBookRepository with correct values', async () => {
        const { sut, addBookRepositorySpy } = makeSut()
        const fakeRequest = mockAddBookParams()
        
        await sut.add(fakeRequest)

        expect(addBookRepositorySpy.params).toStrictEqual(fakeRequest)
    })
    
    test('should throw if addBookRepositorySpy throws', async () => {
        const { sut, addBookRepositorySpy } = makeSut()
        jest.spyOn(addBookRepositorySpy, 'add').mockImplementationOnce(throwError)
        const fakeRequest = mockAddBookParams()

        const promise = sut.add(fakeRequest)

        await expect(promise).rejects.toThrow()
    })
})