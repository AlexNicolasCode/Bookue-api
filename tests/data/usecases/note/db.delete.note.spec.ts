import { DbDeleteNote } from "@/data/usecases/note/db.delete.note";
import { DeleteNoteRepositorySpy } from "tests/data/mocks";
import { mockDeleteNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

type SutType = {
    sut: DbDeleteNote
    deleteNoteRepositorySpy: DeleteNoteRepositorySpy
}

const makeSut = (): SutType => {
    const deleteNoteRepositorySpy = new DeleteNoteRepositorySpy()
    const sut = new DbDeleteNote(deleteNoteRepositorySpy)
    return {
        sut,
        deleteNoteRepositorySpy,
    }
} 

describe('DbDeleteNote', () => {
    test('should call DeleteNoteRepository with correct values', async () => {
        const { sut, deleteNoteRepositorySpy } = makeSut()
        const fakeData = mockDeleteNotesParams() 
        
        await sut.delete(fakeData)

        expect(deleteNoteRepositorySpy.params.userId).toBe(fakeData.userId)
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
})