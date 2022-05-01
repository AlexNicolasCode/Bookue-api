import { CheckAccountByAccessTokenRepository, LoadNotesRepository } from "@/data/protocols";
import { NoteResultModel } from "@/domain/models";
import faker from "@faker-js/faker";
import { throwError } from "tests/domain/mocks/test.helpers";
import { CheckAccountByAccessTokenRepositorySpy, LoadNotesRepositorySpy } from "../mocks";

export class DbLoadNotes implements LoadNotesRepository {
    constructor (
        private readonly checkAccountByAccessToken: CheckAccountByAccessTokenRepository,
        private readonly loadNotesRepository: LoadNotesRepository,
    ) {}

    async loadAll (data: LoadNotesRepository.Params): Promise<NoteResultModel[]> {
        const hasAccount = await this.checkAccountByAccessToken.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            return this.loadNotesRepository.loadAll(data)
        }
    }
}

const mockRequest = (): LoadNotesRepository.Params => ({
    accessToken: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
})

type SutType = {
    sut,
    checkAccountByAccessTokenSpy,
    loadNotesRepositorySpy,
}

const makeSut = (): SutType => {
    const checkAccountByAccessTokenSpy = new CheckAccountByAccessTokenRepositorySpy()
    const loadNotesRepositorySpy = new LoadNotesRepositorySpy()
    const sut = new DbLoadNotes(checkAccountByAccessTokenSpy, loadNotesRepositorySpy)
    return {
        sut,
        checkAccountByAccessTokenSpy,
        loadNotesRepositorySpy,
    }
}

describe('DbLoadNotes', () => {
    test('should throw if CheckAccountByAccessToken throws', async () => {
        const { sut, checkAccountByAccessTokenSpy } = makeSut()
        jest.spyOn(checkAccountByAccessTokenSpy, 'checkByAccessToken').mockImplementationOnce(throwError)
        const fakeRequest = mockRequest()

        const promise = sut.loadAll(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessToken with correct values', async () => {
        const { sut, checkAccountByAccessTokenSpy } = makeSut()
        const fakeRequest = mockRequest()

        await sut.loadAll(fakeRequest)

        expect(checkAccountByAccessTokenSpy.accessToken).toBe(fakeRequest.accessToken)
    })

    test('should throw if LoadNotesRepository throws', async () => {
        const { sut, loadNotesRepositorySpy } = makeSut()
        jest.spyOn(loadNotesRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
        const fakeRequest = mockRequest()

        const promise = sut.loadAll(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })
    
    test('should call LoadNotesRepository with correct values', async () => {
        const { sut, loadNotesRepositorySpy } = makeSut()
        const fakeRequest = mockRequest()

        await sut.loadAll(fakeRequest)

        expect(loadNotesRepositorySpy.params).toBe(fakeRequest)
    })

    test('should return an array of notes on succcess', async () => {
        const { sut, loadNotesRepositorySpy } = makeSut()
        const fakeRequest = mockRequest()

        const notes = await sut.loadAll(fakeRequest)

        expect(notes).toBe(loadNotesRepositorySpy.result)
    })
})