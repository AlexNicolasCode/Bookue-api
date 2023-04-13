import { DbLoadNotes } from "@/data/usecases";

import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadNotesRepositorySpy } from "../../mocks";
import { mockLoadNotesParams } from "tests/domain/mocks";

type SutType = {
    sut,
    loadNotesRepositorySpy,
}

const makeSut = (): SutType => {
    const loadNotesRepositorySpy = new LoadNotesRepositorySpy()
    const sut = new DbLoadNotes(loadNotesRepositorySpy)
    return {
        sut,
        loadNotesRepositorySpy,
    }
}

describe('DbLoadNotes', () => {
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

        expect(loadNotesRepositorySpy.data).toStrictEqual(fakeRequest)
    })

    test('should return an array of notes on succcess', async () => {
        const { sut, loadNotesRepositorySpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()

        const notes = await sut.loadAll(fakeRequest)

        expect(notes).toBe(loadNotesRepositorySpy.result)
    })
})