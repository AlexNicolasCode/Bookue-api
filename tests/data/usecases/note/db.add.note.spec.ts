import { AddNoteRepositorySpy, LoadAccountByTokenRepositorySpy } from "../../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbAddNote } from "@/data/usecases"
import { AddNote } from "@/domain/usecases"

import faker from "@faker-js/faker"

type SutType = {
    sut: DbAddNote
    addNoteRepositorySpy: AddNoteRepositorySpy
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutType => {
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const addNoteRepositorySpy = new AddNoteRepositorySpy()
    const sut = new DbAddNote(loadAccountByTokenRepositorySpy, addNoteRepositorySpy)
    return {
        sut,
        addNoteRepositorySpy,
        loadAccountByTokenRepositorySpy,
    }
}

describe('DbAddNote', () => {
    let fakeRequest: AddNote.Params

    beforeEach(() => {
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
            text: faker.random.words(),
        }
    })

    test('should throw if AddNoteRepository throws', async () => {
        const { sut, addNoteRepositorySpy } = makeSut()
        jest.spyOn(addNoteRepositorySpy, 'add').mockImplementationOnce(throwError)

        const promise = sut.add(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })

    test('should throw if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)

        const promise = sut.add(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })

    test('should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()

        await sut.add(fakeRequest)

        expect(loadAccountByTokenRepositorySpy.token).toBe(fakeRequest.accessToken)
    })

    test('should call AddNoteRepository with correct values', async () => {
        const { 
            sut, 
            loadAccountByTokenRepositorySpy, 
            addNoteRepositorySpy, 
        } = makeSut()


        await sut.add(fakeRequest)

        expect(addNoteRepositorySpy.params).toStrictEqual({
            userId: loadAccountByTokenRepositorySpy.result.id,
            bookId: fakeRequest.bookId,
            text: fakeRequest.text,
        })
    })

    test('should return true on success', async () => {
        const { sut } = makeSut()

        const result = await sut.add(fakeRequest)

        expect(result).toBe(true)
    })

    test('should return undefined if access token is invalid', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        loadAccountByTokenRepositorySpy.result = undefined

        const result = await sut.add(fakeRequest)

        expect(result).toBe(false)
    })
})