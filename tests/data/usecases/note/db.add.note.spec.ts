import { AddNoteRepositorySpy, CheckAccountByAccessTokenRepositorySpy } from "../../mocks"
import { mockNoteModel } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbAddNote } from "@/data/usecases"

type SutType = {
    sut: DbAddNote
    addNoteRepositorySpy: AddNoteRepositorySpy
    checkAccountByAccessTokenRepositorySpy: CheckAccountByAccessTokenRepositorySpy
}

const makeSut = (): SutType => {
    const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
    const addNoteRepositorySpy = new AddNoteRepositorySpy()
    const sut = new DbAddNote(checkAccountByAccessTokenRepositorySpy, addNoteRepositorySpy)
    return {
        sut,
        addNoteRepositorySpy,
        checkAccountByAccessTokenRepositorySpy,
    }
}

describe('DbAddNote', () => {
    test('should throw if AddNoteRepository throws', async () => {
        const { sut, addNoteRepositorySpy } = makeSut()
        const fakeNote = mockNoteModel()
        jest.spyOn(addNoteRepositorySpy, 'add').mockImplementationOnce(throwError)

        const promise = sut.add(fakeNote)

        await expect(promise).rejects.toThrowError()
    })

    test('should throw if CheckAccountByAccessTokenRepository throws', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeNote = mockNoteModel()
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)

        const promise = sut.add(fakeNote)

        await expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessTokenRepository with correct values', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeNote = mockNoteModel()

        await sut.add(fakeNote)

        expect(checkAccountByAccessTokenRepositorySpy.accessToken).toBe(fakeNote.accessToken)
    })

    test('should call AddNoteRepository with correct values', async () => {
        const { sut, addNoteRepositorySpy } = makeSut()
        const fakeNote = mockNoteModel()

        await sut.add(fakeNote)

        expect(addNoteRepositorySpy.params).toBe(fakeNote)
    })

    test('should return true on success', async () => {
        const { sut } = makeSut()
        const fakeNote = mockNoteModel()

        const result = await sut.add(fakeNote)

        expect(result).toBe(true)
    })

    test('should return undefined if access token is invalid', async () => {
        const { sut, checkAccountByAccessTokenRepositorySpy } = makeSut()
        const fakeNote = mockNoteModel()
        checkAccountByAccessTokenRepositorySpy.result = false

        const result = await sut.add(fakeNote)

        expect(result).toBeUndefined()
    })
})