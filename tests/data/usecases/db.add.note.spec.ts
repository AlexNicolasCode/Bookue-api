import { AddNote } from "@/domain/usecases"
import { AddNoteRepository, CheckAccountByAccessTokenRepository } from "@/data/protocols"
import { AddNoteRepositorySpy, CheckAccountByAccessTokenRepositorySpy } from "../mocks"
import { mockNoteModel } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"

export class DbAddNote implements AddNote {
    constructor (
        private readonly checkAccountByAccessTokenRepository: CheckAccountByAccessTokenRepository,
        private readonly addNoteRepository: AddNoteRepository,
    ) {}

    async add (data: AddNoteRepository.Params): Promise<boolean> {
        const hasAccount = await this.checkAccountByAccessTokenRepository.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            return await this.addNoteRepository.add(data)          
        } 
    }
}

describe('DbAddNote', () => {
    test('should throw if AddNoteRepository throws', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const addNoteRepositorySpy = new AddNoteRepositorySpy()
        const sut = new DbAddNote(checkAccountByAccessTokenRepositorySpy, addNoteRepositorySpy)
        const fakeNote = mockNoteModel()
        jest.spyOn(addNoteRepositorySpy, 'add').mockImplementationOnce(throwError)

        const promise = sut.add(fakeNote)

        await expect(promise).rejects.toThrowError()
    })

    test('should throw if CheckAccountByAccessTokenRepository throws', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const addNoteRepositorySpy = new AddNoteRepositorySpy()
        const sut = new DbAddNote(checkAccountByAccessTokenRepositorySpy, addNoteRepositorySpy)
        const fakeNote = mockNoteModel()
        jest.spyOn(checkAccountByAccessTokenRepositorySpy, 'checkByAccessToken').mockImplementationOnce(throwError)

        const promise = sut.add(fakeNote)

        await expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessTokenRepository with correct values', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const addNoteRepositorySpy = new AddNoteRepositorySpy()
        const sut = new DbAddNote(checkAccountByAccessTokenRepositorySpy, addNoteRepositorySpy)
        const fakeNote = mockNoteModel()

        await sut.add(fakeNote)

        expect(checkAccountByAccessTokenRepositorySpy.accessToken).toBe(fakeNote.accessToken)
    })

    test('should call AddNoteRepository with correct values', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const addNoteRepositorySpy = new AddNoteRepositorySpy()
        const sut = new DbAddNote(checkAccountByAccessTokenRepositorySpy, addNoteRepositorySpy)
        const fakeNote = mockNoteModel()

        await sut.add(fakeNote)

        expect(addNoteRepositorySpy.params).toBe(fakeNote)
    })

    test('should return true on success', async () => {
        const checkAccountByAccessTokenRepositorySpy = new CheckAccountByAccessTokenRepositorySpy()
        const addNoteRepositorySpy = new AddNoteRepositorySpy()
        const sut = new DbAddNote(checkAccountByAccessTokenRepositorySpy, addNoteRepositorySpy)
        const fakeNote = mockNoteModel()

        const result = await sut.add(fakeNote)

        expect(result).toBe(true)
    })
})