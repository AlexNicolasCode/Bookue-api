import { BookMongoRepository } from "@/infra/db/book.mongo.repository";
import { MongoHelper } from "@/infra";
import { mockBookModel } from "tests/domain/mocks";

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
})