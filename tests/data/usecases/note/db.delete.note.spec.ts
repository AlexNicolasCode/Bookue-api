import { CheckAccountByAccessTokenRepository, DeleteNoteRepository } from "@/data/protocols";
import { DeleteNote } from "@/domain/usecases";
import { CheckAccountByAccessTokenRepositorySpy, DeleteNoteRepositorySpy } from "tests/data/mocks";
import { mockLoadNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

class DbDeleteNote implements DeleteNote {
    constructor (
        private readonly checkAccountByAccessTokenRepository: CheckAccountByAccessTokenRepository,
        private readonly deleteNoteRepository: DeleteNoteRepository,
    ) {}

    async delete (data: DeleteNote.Params): Promise<boolean> {
        const hasAccount = await this.checkAccountByAccessTokenRepository.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            await this.deleteNoteRepository.delete(data)
            return true
        }
    }
}

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
        const fakeData = mockLoadNotesParams() 
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeData)

        await expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessToken with correct values', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeData = mockLoadNotesParams() 
        
        await sut.delete(fakeData)

        expect(checkAccountByAccessTokenRepositorySpy.accessToken).toBe(fakeData.accessToken)
    })

    test('should call DeleteNoteRepository with correct values', async () => {
        const { sut, deleteNoteRepositorySpy } = makeSut()
        const fakeData = mockLoadNotesParams() 
        
        await sut.delete(fakeData)

        expect(deleteNoteRepositorySpy.params.accessToken).toBe(fakeData.accessToken)
        expect(deleteNoteRepositorySpy.params.bookId).toBe(fakeData.bookId)
    })

    test('should throw if DeleteNoteRepository throws', async () => {
        const { sut, deleteNoteRepositorySpy } = makeSut()
        const fakeData = mockLoadNotesParams()
        jest.spyOn(deleteNoteRepositorySpy, 'delete').mockImplementationOnce(throwError)
        
        const promise = sut.delete(fakeData)

        await expect(promise).rejects.toThrowError()
    })

    test('should return true on success', async () => {
        const { sut } = makeSut()
        const fakeData = mockLoadNotesParams()
        
        const result = await sut.delete(fakeData)

        expect(result).toBe(true)
    })

    test('should return undefined if account not found', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeData = mockLoadNotesParams()
        checkAccountByAccessTokenRepositorySpy.result = undefined
        
        const result = await sut.delete(fakeData)

        expect(result).toBeUndefined()
    })
})