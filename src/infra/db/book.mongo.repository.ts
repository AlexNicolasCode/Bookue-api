import { 
    AddBookRepository, 
    DeleteBookRepository, 
    LoadBooksRepository, 
    LoadBookRepository, 
    UpdateBookRepository,
} from "@/data/protocols"
import { BookModel, UserModel } from "@/domain/models"
import { MongoHelper } from "./mongo.helper"
import { Book, User } from "./mongoose.schemas"

export class BookMongoRepository implements AddBookRepository, LoadBooksRepository, LoadBookRepository, UpdateBookRepository, DeleteBookRepository {
    async add (data: AddBookRepository.Params): Promise<void> {
        try {
            const account = await User.findOne({ accessToken: data.accessToken })
            await Book.create({ ...data, userId: account.id })
        } catch (e) {
            throw new Error(e)
        }
    }

    async loadAll (accessToken: string): Promise<LoadBooksRepository.Result> {
        try {
            const account = await User.findOne({ accessToken }) as UserModel
            const books = await Book.find({ userId: account.id })
            return books
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