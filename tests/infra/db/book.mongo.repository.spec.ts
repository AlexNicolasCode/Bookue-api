import { AddBookRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";
import { MongoHelper } from "@/infra";

export class BookMongoRepository implements AddBookRepository {
    async add (bookData: BookModel): Promise<void> {
        try {
            await MongoHelper.addOneOn('book', 'books', bookData);
        } catch (e) {
            throw new Error(e);
        }
    }
}

describe('BookMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('book', 'books')
    });
})