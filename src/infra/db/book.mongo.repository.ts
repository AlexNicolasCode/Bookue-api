import { AddBookRepository, LoadBookListRepository, LoadBookRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";
import { MongoHelper } from "./mongo.helper";

export class BookMongoRepository implements AddBookRepository, LoadBookListRepository, LoadBookRepository {
    async add (bookData: AddBookRepository.Params): Promise<void> {
        try {
            await MongoHelper.addOneOn('book', bookData);
        } catch (e) {
            throw new Error(e);
        }
    }

    async loadAll (userId: string): Promise<LoadBookListRepository.Result> {
        try {
            return await MongoHelper.loadBookList(userId)
        } catch (error) {
            throw new Error(error)
        }
    }

    async loadOne (data: LoadBookRepository.Request): Promise<BookModel> {
        try {
            return await MongoHelper.loadOneBook(data)
        } catch (error) {
            throw new Error(error)
        }
    }
}