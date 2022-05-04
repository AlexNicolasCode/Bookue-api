import { MongoHelper, NoteMongoRepository } from "@/infra";
import { mockLoadNotes, mockLoadNotesParams, mockNoteModel, mockUserModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import env from "@/env";

const makeSut = (): NoteMongoRepository => {
    return new NoteMongoRepository()
}

describe('NoteMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL)
    })

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('note')
    })

    describe('add()', () => {
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

    describe('loadAll()', () => {
        test('should throw if MongoHelper throws', async () => {
            const sut = makeSut()
            const fakeData = mockLoadNotesParams()
            jest.spyOn(MongoHelper, 'loadNotes').mockImplementationOnce(throwError)

            const promise = sut.loadAll(fakeData)

            await expect(promise).rejects.toThrowError()
        })

        test('should call MongoHelper with correct values', async () => {
            const sut = makeSut()
            const fakeData = mockLoadNotesParams()
            const MongoHelperSpy = jest.spyOn(MongoHelper, 'loadNotes')

            await sut.loadAll(fakeData)

            expect(MongoHelperSpy).toHaveBeenCalledWith(fakeData)
        })

        test('should return notes list on success', async () => {
            const sut = makeSut()
            const fakeData = mockLoadNotesParams()
            const fakeNotes = mockLoadNotes()
            jest.spyOn(MongoHelper, 'loadNotes').mockResolvedValueOnce(fakeNotes)

            const notes = await sut.loadAll(fakeData)

            expect(notes).toBe(fakeNotes)
        })
    })
})