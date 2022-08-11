import { UpdateNote } from "@/domain/usecases";
import { LoadAccountByTokenRepositorySpy, UpdateNoteRepositorySpy } from "tests/data/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { DbUpdateNote } from "@/data/usecases";

import { faker } from "@faker-js/faker";

type SutTypes = {
    sut: DbUpdateNote
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
    updateNoteRepositorySpy: UpdateNoteRepositorySpy
}

const makeSut = (): SutTypes => {
    const updateNoteRepositorySpy = new UpdateNoteRepositorySpy()
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const sut = new DbUpdateNote(loadAccountByTokenRepositorySpy, updateNoteRepositorySpy)
    return {
        sut,
        loadAccountByTokenRepositorySpy,
        updateNoteRepositorySpy,
    }
}

describe('DbUpdateNote', () => {
    let fakeRequest: UpdateNote.Params

    beforeEach(async () => {
        jest.resetAllMocks()
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            noteId: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
            text: faker.random.words(),
        }
    })

    test('should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
        
        const promise = sut.update(fakeRequest)
        
        await expect(promise).rejects.toThrowError()
    })

    test('should call LoadAccountByTokenRepository with correct parameters', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        
        await sut.update(fakeRequest)
        
        expect(loadAccountByTokenRepositorySpy.token).toBe(fakeRequest.accessToken)
    })
    
    test('should throw if UpdateNoteRepository throws', async () => {
        const { sut, updateNoteRepositorySpy } = makeSut()
        jest.spyOn(updateNoteRepositorySpy, 'update').mockImplementationOnce(throwError)

        const promise = sut.update(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })

    test('should call UpdateNoteRepository with correct parameters', async () => {
        const { sut, loadAccountByTokenRepositorySpy, updateNoteRepositorySpy } = makeSut()
        const fakeAccount = loadAccountByTokenRepositorySpy.result

        await sut.update(fakeRequest)

        expect(updateNoteRepositorySpy.params).toStrictEqual({
            userId: fakeAccount.id,
            bookId: fakeRequest.bookId,
            noteId: fakeRequest.noteId,
            text: fakeRequest.text,
        })
    })

    test('should return undefined on success', async () => {
        const { sut } = makeSut()

        const result = await sut.update(fakeRequest)

        expect(result).toBeUndefined()
    })
})