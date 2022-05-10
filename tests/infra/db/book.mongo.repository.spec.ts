import { BookMongoRepository } from "@/infra/db/book.mongo.repository"
import { Book, MongoHelper, User } from "@/infra"
import { mockAddBookParams, mockDeleteBookRequest, mockUpdateBookRequest, mockUserModel } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import env from '@/env'

import faker from "@faker-js/faker"

const makeSut = (): BookMongoRepository => {
    return new BookMongoRepository()
}

describe('BookMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL)
    })

    beforeEach(async () => {
        await Book.deleteMany()
        await User.deleteMany()
    })

    describe('add book system', () => {
        test('should add one only book', async () => {
            const sut = makeSut()
            const bookData = mockAddBookParams()
            jest.spyOn(User, 'findOne').mockResolvedValue(mockUserModel())
            
            await sut.add(bookData)
            
            const count = await MongoHelper.countDocuments('book', bookData)
            expect(count).toBe(1)
        })
    
        test('should throw if User schema throws', async () => {
            const sut = makeSut()
            const bookData = mockAddBookParams()
            jest.spyOn(User, 'findOne').mockImplementationOnce(throwError)
            
            const promise = sut.add(bookData)
            
            await expect(promise).rejects.toThrowError()
        })
    
        test('should throw if Book schema throws', async () => {
            const sut = makeSut()
            const bookData = mockAddBookParams()
            jest.spyOn(Book, 'create').mockImplementationOnce(throwError)
            
            const promise = sut.add(bookData)
            
            await expect(promise).rejects.toThrowError()
        })
    })

    describe('load book list system', () => {
        test('should throw if loadBooks method on MongoHelper throws', async () => {
            const sut = makeSut()
            const fakeAccessToken = faker.datatype.uuid()
            jest.spyOn(MongoHelper, 'loadBooks').mockImplementationOnce(throwError)
            
            const promise = sut.loadAll(fakeAccessToken)
            
            expect(promise).rejects.toThrowError()
        })

        test('should return book list on success', async () => {
            const sut = makeSut()
            const fakeAccessToken = faker.datatype.uuid()
            const bookData = mockAddBookParams()
            jest.spyOn(MongoHelper, 'loadBooks').mockResolvedValueOnce([bookData])
            
            const result = await sut.loadAll(fakeAccessToken)

            expect(result).toStrictEqual([bookData])
        })
    })

    describe('load one book system', () => {
        test('should throw if loadOneBook method on MongoHelper throws', async () => {
            const sut = makeSut()
            const fakeDataRequest = { 
                accessToken: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
            }
            jest.spyOn(MongoHelper, 'loadOneBook').mockImplementationOnce(throwError)
            
            const promise = sut.loadOne(fakeDataRequest)
            
            expect(promise).rejects.toThrowError()
        })

        test('should return a book on success', async () => {
            const sut = makeSut()
            const fakeBook = mockAddBookParams()
            const fakeDataRequest = { 
                accessToken: fakeBook.accessToken,
                bookId: faker.datatype.uuid(),
            }
            jest.spyOn(MongoHelper, 'loadOneBook').mockReturnValueOnce(fakeBook as any)
            
            const book = await sut.loadOne(fakeDataRequest)
            
            expect(book).toBe(fakeBook)
        })
    })

    describe('updateBook method', () => {
        test('should throw if MongoHelper throws', async () => {
            const sut = makeSut()
            const fakeBook = mockUpdateBookRequest()
            jest.spyOn(MongoHelper, 'updateBook').mockImplementationOnce(throwError)

            const promise = sut.update(fakeBook)

            expect(promise).rejects.toThrowError()
        })

        test('should return undefined on success', async () => {
            const sut = makeSut()
            const fakeBook = mockUpdateBookRequest()

            const result = await sut.update(fakeBook)

            expect(result).toBeUndefined()
        })

        test('should call MongoHelper with correct values', async () => {
            const sut = makeSut()
            const fakeBook = mockUpdateBookRequest()
            const MongoHelperSpy = jest.spyOn(MongoHelper, 'updateBook')

            await sut.update(fakeBook)

            expect(MongoHelperSpy).toBeCalledWith(fakeBook)
        })
    })

    describe('delete method', () => {
        test('should call MongoHelper with correct values', async () => {
            const sut = makeSut()
            const fakeData = mockDeleteBookRequest()
            const MongoHelperSpy = jest.spyOn(MongoHelper, 'deleteBook')

            await sut.delete(fakeData)

            expect(MongoHelperSpy).toBeCalledWith(fakeData)
        })

        test('should throw if MongoHelper throws', async () => {
            const sut = makeSut()
            const fakeData = mockDeleteBookRequest()
            jest.spyOn(MongoHelper, 'deleteBook').mockImplementationOnce(throwError)

            const promise = sut.delete(fakeData)

            expect(promise).rejects.toThrowError()
        })

        test('should return undefined on success', async () => {
            const sut = makeSut()
            const fakeData = mockDeleteBookRequest()

            const result = await sut.delete(fakeData)

            expect(result).toBeUndefined()
        })
    })
})