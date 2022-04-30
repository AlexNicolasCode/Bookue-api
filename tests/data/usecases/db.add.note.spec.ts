import { AddNote } from "@/domain/usecases"
import { AddNoteRepository } from "@/data/protocols"
import { AddNoteRepositorySpy } from "../mocks"
import { mockNoteModel } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"

export class DbAddNote implements AddNote {
    constructor (private readonly addNoteRepository: AddNoteRepository) {}

    async add (data: AddNoteRepository.Params): Promise<void> {
        await this.addNoteRepository.add(data)
    }
}

describe('DbAddNote', () => {
    test('should throw if AddNoteRepository throws', async () => {
        const addNoteRepositorySpy = new AddNoteRepositorySpy()
        const sut = new DbAddNote(addNoteRepositorySpy)
        const fakeNote = mockNoteModel()
        jest.spyOn(addNoteRepositorySpy, 'add').mockImplementationOnce(throwError)

        const promise = sut.add(fakeNote)

        expect(addNoteRepositorySpy.add).toBeCalledTimes(1)
        expect(promise).rejects.toThrowError()
    })
})