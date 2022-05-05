import { 
    AddBookRepository, 
    DeleteBookRepository, 
    LoadBooksRepository, 
    LoadBookRepository, 
    UpdateBookRepository,
} from "@/data/protocols"
import { BookModel } from "@/domain/models"
import { MongoHelper } from "./mongo.helper"

export class BookMongoRepository implements AddBookRepository, LoadBooksRepository, LoadBookRepository, UpdateBookRepository, DeleteBookRepository {
    async add (bookData: AddBookRepository.Params): Promise<void> {
        try {
            const account = await MongoHelper.findUserByAccessToken(bookData.accessToken)
            await MongoHelper.addOneOn('book', { ...bookData, userId: account.id })
        } catch (e) {
            throw new Error(e)
        }
    }

    async loadAll (accessToken: string): Promise<LoadBooksRepository.Result> {
        try {
            return await MongoHelper.loadBooks(accessToken)
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

    async update (bookData: UpdateBookRepository.Params): Promise<void> {
        try {
            await MongoHelper.updateBook(bookData)
        } catch (error) {
            throw new Error(error)
        }
    }

    async delete (data: DeleteBookRepository.Params): Promise<void> {
        try {
            await MongoHelper.deleteBook(data)
        } catch (error) {
            throw new Error(error)
        }
    }
}