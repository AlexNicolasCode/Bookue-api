import { faker } from "@faker-js/faker"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

import { BookMongoRepository } from "@/infra/db/book.mongo.repository"
import { Book, User } from "@/infra"
import { DeleteBookRepository, UpdateBookRepository } from "@/data/protocols"

import { mockAddBookParams, mockAccount } from "tests/domain/mocks"

const makeSut = (): BookMongoRepository => {
    return new BookMongoRepository()
}

describe('BookMongoRepository', () => {
    let mongoDb: MongoMemoryServer;

    beforeAll(async () => {
        mongoDb = await MongoMemoryServer.create();
        await mongoose.connect(mongoDb.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoDb.stop()
    })

    beforeEach(async () => {
        jest.restoreAllMocks()
        await Book.deleteMany()
        await User.deleteMany()
    })

    describe('add book system', () => {
        let fakeRequest 

        beforeEach(() => {
            fakeRequest = {
                userId: faker.datatype.uuid(),
                slug: faker.datatype.uuid(),
            }
        })

        test('should add one only book', async () => {
            const sut = makeSut()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockAccount())
            
            await sut.add(fakeRequest)
            
            const count = await Book.countDocuments(fakeRequest)
            expect(count).toBe(1)
        })
        
        test('should save book with correct userId', async () => {
            const sut = makeSut()
            
            await sut.add(fakeRequest)
            
            const book = await Book.findOne({ userId: fakeRequest.userId })
            expect(book.userId).toBe(fakeRequest.userId)
        })
    })

    describe('load books system', () => {      
        test('should return books on success', async () => {
            const sut = makeSut()
            const fakeAccessToken = faker.datatype.uuid()
            const bookData = mockAddBookParams()
            jest.spyOn(Book, 'find').mockResolvedValueOnce([bookData])
            
            const result = await sut.loadAll(fakeAccessToken)

            expect(result).toStrictEqual([bookData])
        })
    })
    
    describe('load one book system', () => {
        let fakeRequest 

        beforeEach(() => {
            fakeRequest = {
                userId: faker.datatype.uuid(),
                slug: faker.datatype.uuid(),
            }
        })

        test('should return a book on success', async () => {
            const sut = makeSut()
            const fakeBook = mockAddBookParams()
            jest.spyOn(Book, 'findOne').mockResolvedValueOnce(fakeBook)
            
            const book = await sut.loadOne(fakeRequest)

            expect(book).toBe(fakeBook)
        })

        test('should call Book with correct values', async () => {
            const sut = makeSut()
            const bookSpy = jest.spyOn(Book, 'findOne').mockResolvedValueOnce('')
            
            await sut.loadOne(fakeRequest)

            expect(bookSpy).toHaveBeenCalledWith({ 
                userId: fakeRequest.userId, 
                slug: fakeRequest.slug, 
            })
        })
    })

    describe('updateBook method', () => {
        let fakeNewBook: UpdateBookRepository.Params

        beforeEach(() => {
            const currentPage = faker.datatype.number()
            fakeNewBook = {
                title: faker.name.fullName(),
                author: faker.name.fullName(),
                description: faker.datatype.string(),
                currentPage: currentPage,
                pages: currentPage + 1,
                userId: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
            }
        })
        
        test('should call Book model with correct values', async () => {
            const sut = makeSut()
            const bookModelSpy = jest.spyOn(Book, 'updateOne').mockResolvedValueOnce(undefined)

            await sut.update(fakeNewBook)

            expect(bookModelSpy).toHaveBeenCalledWith({ 
                userId: fakeNewBook.userId,
                _id: fakeNewBook.bookId,
            }, fakeNewBook)
        })
    })

    describe('delete method', () => {
        let fakerRequest: DeleteBookRepository.Params

        beforeEach(() => {
            fakerRequest = {
                userId: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
            }
        })

        test('should call Book model with correct values', async () => {
            const sut = makeSut()
            const bookModelSpy = jest.spyOn(Book, 'deleteOne').mockResolvedValueOnce(undefined)

            await sut.delete(fakerRequest)

            expect(bookModelSpy).toBeCalledWith({
                userId: fakerRequest.userId,
                _id: fakerRequest.bookId,
            })
        })
    })
})