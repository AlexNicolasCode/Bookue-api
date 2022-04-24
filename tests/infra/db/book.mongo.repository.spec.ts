import { BookMongoRepository } from "@/infra/db/book.mongo.repository";
import { MongoHelper } from "@/infra";
import { mockAddBookParams } from "tests/domain/mocks";
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
            
            const promise = sut.load(fakeUserId);
            
            expect(promise).rejects.toThrowError()
        })

        test('should return book list on success', async () => {
            const sut = new BookMongoRepository()
            const fakeUserId = faker.datatype.uuid()
            
            for (let count = 0; count < 5; count++) {
                await sut.add({ ...mockAddBookParams(), userId: fakeUserId })
            }
            const result = await sut.load(fakeUserId)
            const bookListOfRepository = await MongoHelper.loadBookList(fakeUserId)

            expect(result).toStrictEqual(bookListOfRepository)
        })
    })
})