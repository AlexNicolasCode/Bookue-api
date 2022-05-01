import { MongoHelper, NoteMongoRepository } from "@/infra";
import { mockNoteModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

const makeSut = (): NoteMongoRepository => {
    return new NoteMongoRepository()
}

describe('NoteMongoRepository', () => {
    test('should throw if MongoHelper throws', async () => {
        const sut = makeSut()
        const fakeData = mockNoteModel()
        jest.spyOn(MongoHelper, 'addNote').mockImplementationOnce(throwError)

        const promise = sut.add(fakeData)

        await expect(promise).rejects.toThrowError()
    })

    test('should return undefined on success', async () => {
        const sut = makeSut()
        const fakeData = mockNoteModel()

        const result = await sut.add(fakeData)

        expect(result).toBeUndefined()
    })
})