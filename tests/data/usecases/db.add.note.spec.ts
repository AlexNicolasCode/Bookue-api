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
})