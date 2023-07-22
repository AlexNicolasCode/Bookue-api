import { AddNoteRepositorySpy } from "../../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DbAddNote } from "@/data/usecases"
import { AddNote } from "@/domain/usecases"

import { faker } from "@faker-js/faker"

type SutType = {
    sut: DbAddNote
    addNoteRepositorySpy: AddNoteRepositorySpy
}

const makeSut = (): SutType => {
    const addNoteRepositorySpy = new AddNoteRepositorySpy()
    const sut = new DbAddNote(addNoteRepositorySpy)
    return {
        sut,
        addNoteRepositorySpy,
    }
}

describe('DbAddNote', () => {
    let fakeRequest: AddNote.Params

    beforeEach(() => {
        fakeRequest = {
            userId: faker.datatype.uuid(),
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

    test('should call AddNoteRepository with correct values', async () => {
        const { 
            sut, 
            addNoteRepositorySpy, 
        } = makeSut()


        await sut.add(fakeRequest)

        expect(addNoteRepositorySpy.params).toStrictEqual({
            userId: fakeRequest.userId,
            bookId: fakeRequest.bookId,
            text: fakeRequest.text,
        })
    })
})