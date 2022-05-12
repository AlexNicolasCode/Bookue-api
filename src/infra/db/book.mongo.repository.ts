import { 
    AddBookRepository, 
    DeleteBookRepository, 
    LoadBooksRepository, 
    LoadBookRepository, 
    UpdateBookRepository,
} from "@/data/protocols"
import { BookModel, UserModel } from "@/domain/models"
import { Book, User } from "./mongoose.schemas"

export class BookMongoRepository implements AddBookRepository, LoadBooksRepository, LoadBookRepository, UpdateBookRepository, DeleteBookRepository {
    async add (data: AddBookRepository.Params): Promise<void> {
        try {
            const account = await User.findOne({ accessToken: data.accessToken })
            await Book.create({ ...data, userId: account.id })
        } catch (error) {
            throw new Error(error)
        }
    }

    async loadAll (accessToken: string): Promise<LoadBooksRepository.Result> {
        try {
            const account = await User.findOne({ accessToken: accessToken }) as UserModel
            const books = await Book.find({ userId: account.id })
            return books
        } catch (error) {
            throw new Error(error)
        }
    }

    async loadOne (data: LoadBookRepository.Request): Promise<BookModel> {
        try {
            const account = await User.findOne({ accessToken: data.accessToken }) as UserModel
            const book = await Book.findOne({ userId: account.id, bookId: data.bookId })
            return book
        } catch (error) {
            throw new Error(error)
        }
    }

    async update (data: UpdateBookRepository.Params): Promise<void> {
        try {
            const account = await User.findOne({ accessToken: data.accessToken }) as UserModel
            await Book.updateOne({ userId: account.id, bookId: data.bookId })
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async delete (data: DeleteBookRepository.Params): Promise<void> {
        try {
            const account = await User.findOne({ accessToken: data.accessToken }) as UserModel
            await Book.deleteOne({ userId: account.id, bookId: data.bookId })
        } catch (error) {
            throw new Error(error)
        }
    }
}