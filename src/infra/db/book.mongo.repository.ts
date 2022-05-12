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
        const account = await User.findOne({ accessToken: data.accessToken })
        await Book.create({ ...data, userId: account.id })
    }

    async loadAll (accessToken: string): Promise<LoadBooksRepository.Result> {
        const account = await User.findOne({ accessToken: accessToken }) as UserModel
        const books = await Book.find({ userId: account.id })
        return books
    }

    async loadOne (data: LoadBookRepository.Request): Promise<BookModel> {
        const account = await User.findOne({ accessToken: data.accessToken }) as UserModel
        const book = await Book.findOne({ userId: account.id, bookId: data.bookId })
        return book
    }

    async update (data: UpdateBookRepository.Params): Promise<void> {
        const account = await User.findOne({ accessToken: data.accessToken }) as UserModel
        await Book.updateOne({ userId: account.id, bookId: data.bookId })
    }
    
    async delete (data: DeleteBookRepository.Params): Promise<void> {
        const account = await User.findOne({ accessToken: data.accessToken }) as UserModel
        await Book.deleteOne({ userId: account.id, bookId: data.bookId })
    }
}