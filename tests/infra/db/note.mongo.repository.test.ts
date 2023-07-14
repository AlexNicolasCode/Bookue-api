
import mongoose from "mongoose"
import { faker } from "@faker-js/faker";
import { MongoMemoryServer } from "mongodb-memory-server";

import { Note, NoteMongoRepository, User, Book } from "@/infra";
import { AddBookRepository, DeleteNoteRepository, UpdateNoteRepository } from "@/data/protocols";

import { mockLoadNotes, mockNote, mockAccount } from "tests/domain/mocks";
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
        test('should return undefined on success', async () => {
            const sut = makeSut()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockAccount())
    
            const result = await sut.add(mockNote())
    
            expect(result).toBeUndefined()
        })
    })

    describe('loadAll()', () => {
        let userId: string
        let bookId: string

        beforeEach(async () => {
            const account = await User.create({
                email: faker.internet.email(),
                password: faker.internet.password(),
            })
            const book = await Book.create({
                title: faker.datatype.string(),
                author: faker.datatype.string(),
                description: faker.datatype.string(),
                currentPage: faker.datatype.number(),
                createdAt: faker.datatype.datetime(),
                pages: faker.datatype.number(),
                userId: account.id,
            })
            userId = account.id 
            bookId = book.id 
        })

        afterEach(() => {
            User.deleteMany({})
            Book.deleteMany({})
            Note.deleteMany({})
        })

        test('should call Note model with correct values', async () => {
            const sut = makeSut()
            const noteModelSpy = jest.spyOn(Note, 'find')

            await sut.loadAll({ userId, bookId })

            expect(noteModelSpy).toHaveBeenCalledWith({ userId, bookId })
        })

        test('should return notes list on success', async () => {
            const sut = makeSut()
            await Note.create({
                userId: userId,
                bookId: bookId,
                text: faker.datatype.string(),
                createdAt: faker.datatype.datetime(),
            })
            
            const notes = await sut.loadAll({ userId, bookId })

            const fakeNotes = await Note.find({ userId, bookId })
            expect(notes).toEqual(fakeNotes)
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