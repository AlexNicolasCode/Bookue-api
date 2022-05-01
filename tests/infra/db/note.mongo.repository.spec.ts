import { LoadNotesRepository } from "@/data/protocols";
import { MongoHelper, NoteMongoRepository } from "@/infra";
import { mockNoteModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

import faker from "@faker-js/faker";

const makeSut = (): NoteMongoRepository => {
    return new NoteMongoRepository()
}

const mockLoadNotesParams = (): LoadNotesRepository.Params => ({
    accessToken: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
})

describe('NoteMongoRepository', () => {
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
    })
})