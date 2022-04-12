import { AddBookRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";
import { MongoHelper } from "@/infra";
import { mockBookModel } from "tests/domain/mocks";

import env from '@/env'

class BookMongoRepository implements AddBookRepository {
    async add (bookData: BookModel): Promise<void> {
        try {
            await MongoHelper.addOneOn('book', bookData);
        } catch (e) {
            throw new Error(e);
        }
    }
}

describe('BookMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL);
    });

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('book')
    });
})