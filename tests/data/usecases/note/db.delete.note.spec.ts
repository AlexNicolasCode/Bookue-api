import { DbDeleteNote } from "@/data/usecases/note/db.delete.note";
import { CheckAccountByAccessTokenRepositorySpy, DeleteNoteRepositorySpy } from "tests/data/mocks";
import { mockDeleteNotesParams, mockLoadNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

type SutType = {
    sut: DbDeleteNote
    checkAccountByAccessTokenRepositorySpy: CheckAccountByAccessTokenRepositorySpy
    deleteNoteRepositorySpy: DeleteNoteRepositorySpy
}

const makeSut = (): SutType => {
    const deleteNoteRepositorySpy = new DeleteNoteRepositorySpy()
    const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
    const sut = new DbDeleteNote(checkAccountByAccessTokenRepositorySpy, deleteNoteRepositorySpy)
    return {
        sut,
        checkAccountByAccessTokenRepositorySpy,
        deleteNoteRepositorySpy,
    }
} 

describe('DbDeleteNote', () => {
    test('should throw if CheckAccountByAccessToken throws', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams() 
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeData)

        await expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessToken with correct values', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams() 
        
        await sut.delete(fakeData)

        expect(checkAccountByAccessTokenRepositorySpy.accessToken).toBe(fakeData.accessToken)
    })

    test('should call DeleteNoteRepository with correct values', async () => {
        const { sut, deleteNoteRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams() 
        
        await sut.delete(fakeData)

        expect(deleteNoteRepositorySpy.params.accessToken).toBe(fakeData.accessToken)
        expect(deleteNoteRepositorySpy.params.bookId).toBe(fakeData.bookId)
    })

    test('should throw if DeleteNoteRepository throws', async () => {
        const { sut, deleteNoteRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams()
        jest.spyOn(deleteNoteRepositorySpy, 'delete').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeData)

        await expect(promise).rejects.toThrowError()
    })

    test('should return true on success', async () => {
        const { sut } = makeSut()
        const fakeData = mockDeleteNotesParams()
        
        const result = await sut.delete(fakeData)

        expect(result).toBe(true)
    })

    test('should return undefined if account not found', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams()
        checkAccountByAccessTokenRepositorySpy.result = undefined
        
        const result = await sut.delete(fakeData)

        expect(result).toBeUndefined()
    })
})