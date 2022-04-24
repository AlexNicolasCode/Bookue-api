import { AddBookRepository, LoadBookListRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";
import { MongoHelper } from "./mongo.helper";

export class BookMongoRepository implements AddBookRepository, LoadBookListRepository {
    async add (bookData: BookModel): Promise<void> {
        try {
            await MongoHelper.addOneOn('book', bookData);
        } catch (e) {
            throw new Error(e);
        }
    }

    async load (userId: string): Promise<LoadBookListRepository.Result> {
        try {
            return await MongoHelper.loadBookList(userId)
        } catch (error) {
            throw new Error(error)
        }
    }
}