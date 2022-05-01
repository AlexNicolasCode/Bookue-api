import { MongoHelper, NoteMongoRepository } from "@/infra";
import { mockNoteModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

describe('NoteMongoRepository', () => {
    test('should throw if MongoHelper throws', async () => {
        const sut = new NoteMongoRepository()
        const fakeData = mockNoteModel()
        jest.spyOn(MongoHelper, 'addNote').mockImplementationOnce(throwError)

        const promise = sut.add(fakeData)

        await expect(promise).rejects.toThrowError()
    })

    test('should return undefined on success', async () => {
        const sut = new NoteMongoRepository()
        const fakeData = mockNoteModel()

        const result = await sut.add(fakeData)

        expect(result).toBeUndefined()
    })
})