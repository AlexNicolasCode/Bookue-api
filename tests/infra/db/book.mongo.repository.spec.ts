import { BookMongoRepository } from "@/infra/db/book.mongo.repository";
import { MongoHelper } from "@/infra";
import { mockAddBookParams, mockUpdateBookRequest, mockUserModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import env from '@/env'

import faker from "@faker-js/faker";

describe('BookMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL);
    });

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('book')
    });

    describe('add book system', () => {
        test('should add one only book', async () => {
            const sut = new BookMongoRepository();
            const bookData = mockAddBookParams();
            jest.spyOn(MongoHelper, 'findUserByAccessToken').mockResolvedValue(mockUserModel())
            
            await sut.add(bookData);
            
            const count = await MongoHelper.countDocuments('book', bookData);
            expect(count).toBe(1)
        })
    
        test('should throw if addOneOn method on MongoHelper throws', async () => {
            const sut = new BookMongoRepository();
            const bookData = mockAddBookParams();
            jest.spyOn(MongoHelper, 'addOneOn').mockImplementationOnce(throwError)
            
            const promise = sut.add(bookData);
            
            expect(promise).rejects.toThrowError()
        })
    })

    describe('load book list system', () => {
        test('should throw if loadBookList method on MongoHelper throws', async () => {
            const sut = new BookMongoRepository();
            const fakeAccessToken = faker.datatype.uuid()
            jest.spyOn(MongoHelper, 'loadBookList').mockImplementationOnce(throwError)
            
            const promise = sut.loadAll(fakeAccessToken);
            
            expect(promise).rejects.toThrowError()
        })

        test('should return book list on success', async () => {
            const sut = new BookMongoRepository()
            const fakeAccessToken = faker.datatype.uuid()
            
            for (let count = 0; count < 5; count++) {
                await sut.add({ ...mockAddBookParams(), accessToken: fakeAccessToken })
            }
            const result = await sut.loadAll(fakeAccessToken)
            const bookListOfRepository = await MongoHelper.loadBookList(fakeAccessToken)

            expect(result).toStrictEqual(bookListOfRepository)
        })
    })

    describe('load one book system', () => {
        test('should throw if loadOneBook method on MongoHelper throws', async () => {
            const sut = new BookMongoRepository();
            const fakeDataRequest = { 
                accessToken: faker.datatype.uuid(),
                bookId: faker.datatype.uuid(),
            }
            jest.spyOn(MongoHelper, 'loadOneBook').mockImplementationOnce(throwError)
            
            const promise = sut.loadOne(fakeDataRequest);
            
            expect(promise).rejects.toThrowError()
        })

        test('should return a book on success', async () => {
            const sut = new BookMongoRepository();
            const fakeBook = mockAddBookParams()
            const fakeDataRequest = { 
                accessToken: fakeBook.accessToken,
                bookId: faker.datatype.uuid(),
            }
            jest.spyOn(MongoHelper, 'loadOneBook').mockReturnValueOnce(fakeBook as any)
            
            const book = await sut.loadOne(fakeDataRequest);
            
            expect(book).toBe(fakeBook)
        })
    })

    describe('updateBook method', () => {
        test('should throw if MongoHelper throws', async () => {
            const sut = new BookMongoRepository()
            const fakeBook = mockUpdateBookRequest()
            jest.spyOn(MongoHelper, 'updateBook').mockImplementationOnce(throwError)

            const promise = sut.update(fakeBook)

            expect(promise).rejects.toThrowError()
        })

        test('should return undefined on success', async () => {
            const sut = new BookMongoRepository()
            const fakeBook = mockUpdateBookRequest()

            const result = await sut.update(fakeBook)

            expect(result).toBeUndefined()
        })

        test('should call MongoHelper with correct values', async () => {
            const sut = new BookMongoRepository()
            const fakeBook = mockUpdateBookRequest()
            const MongoHelperSpy = jest.spyOn(MongoHelper, 'updateBook')

            await sut.update(fakeBook)

            expect(MongoHelperSpy).toBeCalledWith(fakeBook)
        })
    })
})