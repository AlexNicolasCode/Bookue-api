
import mongoose from "mongoose"
import { faker } from "@faker-js/faker";
import { MongoMemoryServer } from "mongodb-memory-server";

import { Note, NoteMongoRepository } from "@/infra";
import { AddNoteRepository, DeleteNoteRepository, LoadNotesRepository, UpdateNoteRepository } from "@/data/protocols";

import { throwError } from "tests/domain/mocks/test.helpers";

const makeSut = (): NoteMongoRepository => {
    return new NoteMongoRepository()
}

describe('NoteMongoRepository', () => {
    let mongoDb: MongoMemoryServer;

    beforeAll(async () => {
        mongoDb = await MongoMemoryServer.create();
        await mongoose.connect(mongoDb.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoDb.stop()
    })

    describe('add()', () => {
        let fakeRequest: AddNoteRepository.Params

        beforeEach(async () => {
            fakeRequest = {
                userId: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
                text: faker.datatype.string(),
            }
        })

        afterEach(() => {
            Note.deleteMany({})
        })

        test('should add only one note on success', async () => {
            const sut = makeSut()

            await sut.add(fakeRequest)
    
            const notes = await Note.find(fakeRequest)
            expect(notes.length).toEqual(1)
        })

        test('should throw if Note model throws', async () => {
            const sut = makeSut()
            jest.spyOn(Note, 'create').mockImplementationOnce(throwError)

            const promise = sut.add(fakeRequest)

            await expect(promise).rejects.toThrow()
        })

        test('should add correct note on success', async () => {
            const sut = makeSut()

            await sut.add(fakeRequest)
    
            const noteFromDatabase = await Note.findOne(fakeRequest)
            expect(fakeRequest).toEqual({
                userId: noteFromDatabase.userId,
                bookId: noteFromDatabase.bookId,
                text: noteFromDatabase.text,
            })
        })
    })

    describe('loadAll()', () => {
        let fakeRequest: LoadNotesRepository.Params

        beforeEach(async () => {
            fakeRequest = {
                userId: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
            }
        })

        afterEach(() => {
            Note.deleteMany({})
        })

        test('should call Note model with correct values', async () => {
            const sut = makeSut()
            const noteModelSpy = jest.spyOn(Note, 'find')

            await sut.loadAll(fakeRequest)

            expect(noteModelSpy).toHaveBeenCalledWith(fakeRequest)
        })

        test('should throw if Note model throws', async () => {
            const sut = makeSut()
            jest.spyOn(Note, 'find').mockImplementationOnce(throwError)

            const promise = sut.loadAll(fakeRequest)

            await expect(promise).rejects.toThrow()
        })

        test('should return notes list on success', async () => {
            const sut = makeSut()
            await Note.create({
                userId: fakeRequest.userId,
                bookId: fakeRequest.bookId,
                text: faker.datatype.string(),
                createdAt: faker.datatype.datetime(),
            })
            
            const notes = await sut.loadAll(fakeRequest)

            const fakeNotes = await Note.find(fakeRequest)
            expect(notes).toEqual(fakeNotes)
        })
    })

    describe('delete()', () => {
        let fakeRequest: DeleteNoteRepository.Params

        beforeEach(async () => {
            fakeRequest = {
                userId: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
                noteId: faker.datatype.uuid(),
            }
        })

        afterEach(() => {
            Note.deleteMany({})
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

        test('should delete note on success', async () => {
            const sut = makeSut()

            await sut.delete(fakeRequest)

            const notes = await Note.find(fakeRequest)
            expect(notes.length).toStrictEqual(0)
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

        test('should update correctly on success', async () => {
            const sut = makeSut()
            const noteCreated =  await Note.create({
                userId: fakeNote.userId,
                bookId: fakeNote.bookId,
                text: fakeNote.text,
            })
            fakeNote.noteId = noteCreated.id
            fakeNote.text = faker.random.words()

            await sut.update(fakeNote)

            const noteAfterUpdate = await Note.findOne(fakeNote)
            expect({
                noteId: noteAfterUpdate.id,
                userId: noteAfterUpdate.userId,
                bookId: noteAfterUpdate.bookId,
                text: noteAfterUpdate.text,
            }).toStrictEqual(fakeNote)
        })
    })
})