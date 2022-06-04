import { BookMongoRepository } from "@/infra/db/book.mongo.repository"
import { Book, User } from "@/infra"
import { mockAddBookParams, mockAccount } from "tests/domain/mocks"
import { DeleteBookRepository, UpdateBookRepository } from "@/data/protocols"
import env from '@/env'

import faker from "@faker-js/faker"
import * as mongoose from 'mongoose'

const makeSut = (): BookMongoRepository => {
    return new BookMongoRepository()
}

describe('BookMongoRepository', () => {
    beforeAll(async () => {
        await mongoose.connect(env.MONGO_URL)
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })

    beforeEach(async () => {
        jest.restoreAllMocks()
        await Book.deleteMany()
        await User.deleteMany()
    })

    describe('add book system', () => {
        test('should add one only book', async () => {
            const sut = makeSut()
            const bookData = {
                userId: faker.datatype.uuid(),
                ...mockAddBookParams()
            }
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockAccount())
            
            await sut.add(bookData)
            
            const count = await Book.countDocuments(bookData)
            expect(count).toBe(1)
        })
        
        test('should save book with correct userId', async () => {
            const sut = makeSut()
            const bookData = {
                userId: faker.datatype.uuid(),
                ...mockAddBookParams()
            }
            
            await sut.add(bookData)
            
            const book = await Book.findOne({ userId: bookData.userId })
            expect(book.userId).toBe(bookData.userId)
        })
    })

    describe('load books system', () => {      
        test('should return books on success', async () => {
            const sut = makeSut()
            const fakeAccessToken = faker.datatype.uuid()
            const bookData = {
                userId: faker.datatype.uuid(),
                ...mockAddBookParams()
            }
            jest.spyOn(Book, 'find').mockResolvedValueOnce([bookData])
            
            const result = await sut.loadAll(fakeAccessToken)

            expect(result).toStrictEqual([bookData])
        })
    })
    
    describe('load one book system', () => {
        let fakeRequest 

        beforeEach(() => {
            fakeRequest = {
                accessToken: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
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
            const bookSpy = jest.spyOn(Book, 'findOne')
            
            await sut.loadOne(fakeRequest)

            expect(bookSpy).toHaveBeenCalledWith({ 
                userId: fakeRequest.userId, 
                bookId: fakeRequest.bookId, 
            })
        })
    })

    describe('updateBook method', () => {
        let fakeNewBook: UpdateBookRepository.Params

        beforeEach(() => {
            const currentPage = faker.datatype.number()
            fakeNewBook = {
                title: faker.name.findName(),
                author: faker.name.findName(),
                description: faker.datatype.string(),
                currentPage: currentPage,
                pages: currentPage + 1,
                userId: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
            }
        })

        test('should return undefined on success', async () => {
            const sut = makeSut()

            const result = await sut.update(fakeNewBook)

            expect(result).toBeUndefined()
        })
        
        test('should call Book model with correct values', async () => {
            const sut = makeSut()
            const bookModelSpy = jest.spyOn(Book, 'updateOne')

            await sut.update(fakeNewBook)

            expect(bookModelSpy).toHaveBeenCalledWith({ 
                userId: fakeNewBook.userId,
                bookId: fakeNewBook.bookId,
            }, fakeNewBook)
        })
    })

    describe('delete method', () => {
        let fakeBookIdentify: DeleteBookRepository.Params

        beforeEach(() => {
            fakeBookIdentify = {
                userId: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
            }
        })

        test('should call Book model with correct values', async () => {
            const sut = makeSut()
            const bookModelSpy = jest.spyOn(Book, 'deleteOne')

            await sut.delete(fakeBookIdentify)

            expect(bookModelSpy).toBeCalledWith(fakeBookIdentify)
        })

        test('should return undefined on success', async () => {
            const sut = makeSut()

            const result = await sut.delete(fakeBookIdentify)

            expect(result).toBeUndefined()
        })
    })
})