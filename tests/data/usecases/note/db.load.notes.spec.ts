import { throwError } from "tests/domain/mocks/test.helpers";
import { CheckAccountByAccessTokenRepositorySpy, LoadNotesRepositorySpy } from "../../mocks";
import { DbLoadNotes } from "@/data/usecases";
import { mockLoadNotesParams } from "tests/domain/mocks";

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
        const fakeRequest = mockLoadNotesParams()

        const promise = sut.loadAll({ bookId: fakeRequest })

        await expect(promise).rejects.toThrowError()
    })

    test('should call CheckAccountByAccessToken with correct values', async () => {
        const { sut, checkAccountByAccessTokenSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()

        await sut.loadAll(fakeRequest)

        expect(checkAccountByAccessTokenSpy.accessToken).toBe(fakeRequest.accessToken)
    })

    test('should throw if LoadNotesRepository throws', async () => {
        const { sut, loadNotesRepositorySpy } = makeSut()
        jest.spyOn(loadNotesRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
        const fakeRequest = mockLoadNotesParams()

        const promise = sut.loadAll(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })
    
    test('should call LoadNotesRepository with correct values', async () => {
        const { sut, loadNotesRepositorySpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()

        await sut.loadAll(fakeRequest)

        expect(loadNotesRepositorySpy.bookId).toBe(fakeRequest.bookId)
    })

    test('should return an array of notes on succcess', async () => {
        const { sut, loadNotesRepositorySpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()

        const notes = await sut.loadAll(fakeRequest)

        expect(notes).toBe(loadNotesRepositorySpy.result)
    })
})