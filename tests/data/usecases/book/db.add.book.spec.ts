import { DbAddBook } from "@/data/usecases"
import { mockAddBookParams } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { AddBookRepositorySpy, LoadAccountByTokenRepositorySpy } from "../../mocks"

type SutTypes = {
    sut: DbAddBook
    addBookRepositorySpy: AddBookRepositorySpy,
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const addBookRepositorySpy = new AddBookRepositorySpy()
    const sut = new DbAddBook(loadAccountByTokenRepositorySpy, addBookRepositorySpy)
    return {
        sut,
        addBookRepositorySpy,
        loadAccountByTokenRepositorySpy,
    }
}

describe('DbAddBook', () => {
    test('should send correct bookData', async () => {
        const { sut, loadAccountByTokenRepositorySpy, addBookRepositorySpy } = makeSut()
        const fakeRequest = mockAddBookParams()
        
        await sut.add(fakeRequest)

        expect(addBookRepositorySpy.params).toStrictEqual({
            userId: loadAccountByTokenRepositorySpy.result.id,
            ...fakeRequest,
        })
    })
    
    test('should throw if addBookRepositorySpy throws', async () => {
        const { sut, addBookRepositorySpy } = makeSut()
        jest.spyOn(addBookRepositorySpy, 'add').mockImplementationOnce(throwError)
        const fakeRequest = mockAddBookParams()

        const promise = sut.add(fakeRequest)

        await expect(promise).rejects.toThrow()
    })
})