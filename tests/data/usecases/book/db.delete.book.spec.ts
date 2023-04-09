import { DeleteBookRepositorySpy } from "../../mocks"
import { mockDeleteBookParams } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbDeleteBook } from "@/data/usecases"

type SutType = {
    sut: DbDeleteBook
    deleteBookRepositorySpy: DeleteBookRepositorySpy
}

const makeSut = (): SutType => {
    const deleteBookRepositorySpy = new DeleteBookRepositorySpy()
    const sut = new DbDeleteBook(deleteBookRepositorySpy)
    return {
        sut,
        deleteBookRepositorySpy,
    }
}

describe('DbDeleteBook', () => {
    test('should throws if DeleteBookRepository throws', async () => {
        const { sut, deleteBookRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookParams()
        jest.spyOn(deleteBookRepositorySpy, 'delete').mockImplementationOnce(throwError)

        const promise = sut.delete(fakeRequest)

        expect(promise).rejects.toThrowError()
    })
    
    test('should call DeleteBookRepository with correct values', async () => {
        const { sut, deleteBookRepositorySpy } = makeSut()
        const fakeRequest = mockDeleteBookParams()
        
        await sut.delete(fakeRequest)
        
        expect(deleteBookRepositorySpy).toBe(fakeRequest)
    })
})