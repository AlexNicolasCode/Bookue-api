import { BookMongoRepository } from "@/infra/db/book.mongo.repository";
import { MongoHelper } from "@/infra";
import { mockAddBookParams, mockBookModel } from "tests/domain/mocks";
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
            const fakeUserId = faker.datatype.uuid()
            jest.spyOn(MongoHelper, 'loadBookList').mockImplementationOnce(throwError)
            
            const promise = sut.loadAll(fakeUserId);
            
            expect(promise).rejects.toThrowError()
        })

        test('should return book list on success', async () => {
            const sut = new BookMongoRepository()
            const fakeUserId = faker.datatype.uuid()
            
            for (let count = 0; count < 5; count++) {
                await sut.add({ ...mockAddBookParams(), userId: fakeUserId })
            }
            const result = await sut.loadAll(fakeUserId)
            const bookListOfRepository = await MongoHelper.loadBookList(fakeUserId)

            expect(result).toStrictEqual(bookListOfRepository)
        })
    })

    describe('load one book system', () => {
        test('should throw if loadOneBook method on MongoHelper throws', async () => {
            const sut = new BookMongoRepository();
            const fakeDataRequest = { 
                userId: faker.datatype.uuid(),
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
                userId: fakeBook.userId,
                bookId: faker.datatype.uuid(),
            }
            jest.spyOn(MongoHelper, 'loadOneBook').mockReturnValueOnce(fakeBook as any)
            
            const book = await sut.loadOne(fakeDataRequest);
            
            expect(book).toBe(fakeBook)
        })
    })
})