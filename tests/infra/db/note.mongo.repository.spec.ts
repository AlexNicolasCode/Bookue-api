import { AddNoteRepository } from "@/data/protocols";
import { NoteModel } from "@/domain/models";
import { MongoHelper } from "@/infra";
import { mockNoteModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

export class NoteMongoRepository implements AddNoteRepository {
    async add (data: NoteModel): Promise<void> {
        try {
            await MongoHelper.addNote(data)
        } catch (error) {
            throw new Error(error)
        }
    }
}

describe('NoteMongoRepository', () => {
    test('should throw if MongoHelper throws', async () => {
        const sut = new NoteMongoRepository()
        const fakeData = mockNoteModel()
        jest.spyOn(MongoHelper, 'addNote').mockImplementationOnce(throwError)

        const promise = sut.add(fakeData)

        await expect(promise).rejects.toThrowError()
    })
})