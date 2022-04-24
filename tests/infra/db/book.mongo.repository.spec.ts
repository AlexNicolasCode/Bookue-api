import { BookMongoRepository } from "@/infra/db/book.mongo.repository";
import { MongoHelper } from "@/infra";
import { mockBookModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import env from '@/env'

describe('BookMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL);
    });

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('book')
    });

    test('should add one only book', async () => {
        const sut = new BookMongoRepository();
        const bookData = mockBookModel();
        
        await sut.add(bookData);
        
        const count = await MongoHelper.countDocuments('book', bookData);
        expect(count).toBe(1)
    })

    test('should throw if addOneOn method on MongoHelper throws', async () => {
        const sut = new BookMongoRepository();
        const bookData = mockBookModel();
        jest.spyOn(MongoHelper, 'addOneOn').mockImplementationOnce(throwError)
        
        const promise = sut.add(bookData);
        
        expect(promise).rejects.toThrowError()
    })

    test('should throw if loadBookList method on MongoHelper throws', async () => {
        const sut = new BookMongoRepository();
        const bookData = mockBookModel();
        jest.spyOn(MongoHelper, 'loadBookList').mockImplementationOnce(throwError)
        
        const promise = sut.add(bookData);
        
        expect(promise).rejects.toThrowError()
    })
})