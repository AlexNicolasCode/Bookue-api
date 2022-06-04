import { DbDeleteNote } from "@/data/usecases/note/db.delete.note";
import { DeleteNoteRepositorySpy, LoadAccountByTokenRepositorySpy } from "tests/data/mocks";
import { mockDeleteNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

type SutType = {
    sut: DbDeleteNote
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
    deleteNoteRepositorySpy: DeleteNoteRepositorySpy
}

const makeSut = (): SutType => {
    const deleteNoteRepositorySpy = new DeleteNoteRepositorySpy()
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const sut = new DbDeleteNote(loadAccountByTokenRepositorySpy, deleteNoteRepositorySpy)
    return {
        sut,
        loadAccountByTokenRepositorySpy,
        deleteNoteRepositorySpy,
    }
} 

describe('DbDeleteNote', () => {
    test('should throw if CheckAccountByAccessToken throws', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams() 
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeData)

        await expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessToken with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams() 
        
        await sut.delete(fakeData)

        expect(loadAccountByTokenRepositorySpy.token).toBe(fakeData.accessToken)
    })

    test('should call DeleteNoteRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy, deleteNoteRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams() 
        const fakeUser = loadAccountByTokenRepositorySpy.result
        
        await sut.delete(fakeData)

        expect(deleteNoteRepositorySpy.params.userId).toBe(fakeUser.id)
        expect(deleteNoteRepositorySpy.params.noteId).toBe(fakeData.noteId)
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
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams()
        loadAccountByTokenRepositorySpy.result = undefined
        
        const result = await sut.delete(fakeData)

        expect(result).toBe(false)
    })
})