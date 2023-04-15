import { UpdateNote } from "@/domain/usecases";
import { DbUpdateNote } from "@/data/usecases";

import { UpdateNoteRepositorySpy } from "tests/data/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

import { faker } from "@faker-js/faker";

type SutTypes = {
    sut: DbUpdateNote
    updateNoteRepositorySpy: UpdateNoteRepositorySpy
}

const makeSut = (): SutTypes => {
    const updateNoteRepositorySpy = new UpdateNoteRepositorySpy()
    const sut = new DbUpdateNote(updateNoteRepositorySpy)
    return {
        sut,
        updateNoteRepositorySpy,
    }
}

describe('DbUpdateNote', () => {
    let fakeRequest: UpdateNote.Params

    beforeEach(async () => {
        jest.resetAllMocks()
        fakeRequest = {
            userId: faker.datatype.uuid(),
            noteId: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
            text: faker.random.words(),
        }
    })
    
    test('should throw if UpdateNoteRepository throws', async () => {
        const { sut, updateNoteRepositorySpy } = makeSut()
        jest.spyOn(updateNoteRepositorySpy, 'update').mockImplementationOnce(throwError)

        const promise = sut.update(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })

    test('should call UpdateNoteRepository with correct parameters', async () => {
        const { sut, updateNoteRepositorySpy } = makeSut()

        await sut.update(fakeRequest)

        expect(updateNoteRepositorySpy.params).toStrictEqual({
            userId: fakeRequest.userId,
            bookId: fakeRequest.bookId,
            noteId: fakeRequest.noteId,
            text: fakeRequest.text,
        })
    })
})