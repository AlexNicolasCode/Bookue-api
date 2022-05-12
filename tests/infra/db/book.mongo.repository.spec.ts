import { BookMongoRepository } from "@/infra/db/book.mongo.repository"
import { Book, MongoHelper, User } from "@/infra"
import { mockAddBookParams, mockBookModel, mockDeleteBookRequest, mockUpdateBookRequest, mockUserModel } from "tests/domain/mocks"
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
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserModel())
            
            await sut.add(bookData)
            
            const count = await MongoHelper.countDocuments('book', bookData)
            expect(count).toBe(1)
        })
        
        test('should save book with correct userId', async () => {
            const sut = makeSut()
            const bookData = mockAddBookParams()
            const fakeAccount = mockUserModel()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(fakeAccount)
            
            await sut.add(bookData)
            
            const book = await Book.findOne({ userId: fakeAccount.id })
            expect(book.userId).toBe(fakeAccount.id)
        })
    })

    describe('load books system', () => {      
        test('should return books on success', async () => {
            const sut = makeSut()
            const fakeAccessToken = faker.datatype.uuid()
            const bookData = mockAddBookParams()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserModel())
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
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUserModel())
            jest.spyOn(Book, 'findOne').mockResolvedValueOnce(fakeBook)
            
            const book = await sut.loadOne(fakeRequest)

            expect(book).toBe(fakeBook)
        })

        test('should call Book with correct values', async () => {
            const sut = makeSut()
            const fakeUser = mockUserModel()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(fakeUser)
            const bookSpy = jest.spyOn(Book, 'findOne')
            
            await sut.loadOne(fakeRequest)

            expect(bookSpy).toHaveBeenCalledWith({ 
                userId: fakeUser.id, 
                bookId: fakeRequest.bookId, 
            })
        })

        test('should call User with correct values', async () => {
            const sut = makeSut()
            const ramdomUserId = faker.datatype.uuid()
            const userSpy = jest.spyOn(User, 'findOne')
            userSpy.mockResolvedValueOnce({ id: ramdomUserId })
            
            await sut.loadOne(fakeRequest)

            expect(userSpy).toHaveBeenCalledWith({ accessToken: fakeRequest.accessToken })
        })
    })

    describe('updateBook method', () => {
        test('should return undefined on success', async () => {
            const sut = makeSut()
            const fakeBook = mockUpdateBookRequest()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockBookModel())

            const result = await sut.update(fakeBook)

            expect(result).toBeUndefined()
        })

        test('should call User model with correct values', async () => {
            const sut = makeSut()
            const fakeBook = mockUpdateBookRequest()
            const userModelSpy = jest.spyOn(User, 'findOne')
            userModelSpy.mockResolvedValueOnce(mockUserModel())
            
            await sut.update(fakeBook)
            
            expect(userModelSpy).toHaveBeenCalledWith({ accessToken: fakeBook.accessToken })
        })
        
        test('should call Book model with correct values', async () => {
            const sut = makeSut()
            const fakeBook = mockUpdateBookRequest()
            const fakeUser = mockUserModel()
            jest.spyOn(User, 'findOne').mockResolvedValueOnce(fakeUser)
            const bookModelSpy = jest.spyOn(Book, 'updateOne')

            await sut.update(fakeBook)

            expect(bookModelSpy).toHaveBeenCalledWith({ 
                userId: fakeUser.id,
                bookId: fakeBook.bookId,
            })
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