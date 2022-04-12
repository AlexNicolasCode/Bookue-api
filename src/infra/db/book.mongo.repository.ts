import { AddBookRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";
import { MongoHelper } from "./mongo.helper";

export class BookMongoRepository implements AddBookRepository {
    async add (bookData: BookModel): Promise<void> {
        try {
            await MongoHelper.addOneOn('book', bookData);
        } catch (e) {
            throw new Error(e);
        }
    }
}