import { MongoHelper, Note, NoteMongoRepository, User } from "@/infra";
import { mockLoadNotes, mockNoteModel, mockUserModel } from "tests/domain/mocks";
import { DeleteNote } from "@/domain/usecases";
import { throwError } from "tests/domain/mocks/test.helpers";
import { AddNoteRepository } from "@/data/protocols";
import env from "@/env";

import faker from "@faker-js/faker";

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
        let fakeRequest: AddNoteRepository.Params

        beforeEach(() => {
            fakeRequest = {
                userId: faker.datatype.uuid(),
                ...mockNoteModel(),
            }
        })

        test('should return undefined on success', async () => {
            const sut = makeSut()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserModel())
    
            const result = await sut.add(fakeRequest)
    
            expect(result).toBeUndefined()
        })
    })

    describe('loadAll()', () => {
        let bookId: string

        beforeEach(() => {
            bookId = faker.datatype.uuid()
        })

        test('should call Note model with correct values', async () => {
            const sut = makeSut()
            const noteModelSpy = jest.spyOn(Note, 'find')
            noteModelSpy.mockResolvedValueOnce([mockNoteModel()])

            await sut.loadAll(bookId)

            expect(noteModelSpy).toHaveBeenCalledWith({ bookId })
        })

        test('should return notes list on success', async () => {
            const sut = makeSut()
            const fakeNotes = mockLoadNotes()
            jest.spyOn(Note, 'find').mockResolvedValueOnce(fakeNotes)

            const notes = await sut.loadAll(bookId)

            expect(notes).toBe(fakeNotes)
        })
    })

    describe('delete()', () => {
        let fakeRequest: DeleteNote.Params;

        beforeEach(() => {
            fakeRequest = {
                accessToken: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
                noteId: faker.datatype.uuid(),
            }
        })

        test('should call Note model with correct values', async () => {
            const sut = makeSut()
            const noteModelSpy =  jest.spyOn(Note, 'deleteOne')

            await sut.delete(fakeRequest)

            expect(noteModelSpy).toHaveBeenCalledWith({ 
                id: fakeRequest.noteId, 
                bookId: fakeRequest.bookId, 
            })
        })

        test('should throw if Note model throws', async () => {
            const sut = makeSut()
            jest.spyOn(Note, 'deleteOne').mockImplementationOnce(throwError)

            const promise = sut.delete(fakeRequest)

            await expect(promise).rejects.toThrowError()
        })

        test('should return undefined on success', async () => {
            const sut = makeSut()

            const result = await sut.delete(fakeRequest)

            expect(result).toBeUndefined()
        })
    })
})