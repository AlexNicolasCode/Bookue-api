import { Note, NoteMongoRepository, User } from "@/infra";
import { mockLoadNotes, mockNote, mockAccount } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { DeleteNoteRepository, UpdateNoteRepository } from "@/data/protocols";
import env from "@/env";

import faker from "@faker-js/faker";
import mongoose from 'mongoose'

const makeSut = (): NoteMongoRepository => {
    return new NoteMongoRepository()
}

describe('NoteMongoRepository', () => {
    beforeAll(async () => {
        await mongoose.connect(env.MONGO_URL)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    beforeEach(async () => {
        await Note.deleteMany({})
        jest.resetAllMocks()
    })

    describe('add()', () => {
        test('should return undefined on success', async () => {
            const sut = makeSut()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockAccount())
    
            const result = await sut.add(mockNote())
    
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
            noteModelSpy.mockResolvedValueOnce([mockNote()])

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
        let fakeRequest: DeleteNoteRepository.Params;

        beforeEach(() => {
            fakeRequest = {
                userId: faker.datatype.uuid(),
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
                userId: fakeRequest.userId,
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

    describe('update()', () => {
        let fakeNote: UpdateNoteRepository.Params

        beforeEach(() => {
            fakeNote = {
                userId: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
                noteId: faker.datatype.uuid(),
                text: faker.random.words(),
            }
        })

        test('should throw if Note schema throws', async () => {
            const sut = makeSut()
            jest.spyOn(Note, 'updateOne').mockImplementationOnce(throwError)
            
            const promise = sut.update(fakeNote)
            
            await expect(promise).rejects.toThrowError()
        })
        
        test('should call Note schema with correct parameters', async () => {
            const sut = makeSut()
            const noteSchemaSpy = jest.spyOn(Note, 'updateOne')

            await sut.update(fakeNote)

            expect(noteSchemaSpy).toHaveBeenCalledWith({
                userId: fakeNote.userId,
                bookId: fakeNote.bookId,
                noteId: fakeNote.noteId,
            }, fakeNote)
        })

        test('should return undefined on success', async () => {
            const sut = makeSut()

            const result = await sut.update(fakeNote)

            expect(result).toBeUndefined()
        })
    })
})