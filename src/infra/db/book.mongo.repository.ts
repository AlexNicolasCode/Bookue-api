import { 
    AddBookRepository, 
    DeleteBookRepository, 
    LoadBooksRepository, 
    LoadBookRepository, 
    UpdateBookRepository,
} from "@/data/protocols"
import { BookModel } from "@/domain/models"
import { Book } from "./mongoose.schemas"

export class BookMongoRepository implements AddBookRepository, LoadBooksRepository, LoadBookRepository, UpdateBookRepository, DeleteBookRepository {
    async add (data: AddBookRepository.Params): Promise<void> {
        await Book.create({ 
            userId: data.userId,
            ...data,
        })
    }

    async loadAll (userId: string): Promise<LoadBooksRepository.Result> {
        return await Book.find({ userId })
    }

    async loadOne (data: LoadBookRepository.Request): Promise<BookModel> {
        return await Book.findOne({ userId: data.userId, bookId: data.bookId })
    }

    async update (book: UpdateBookRepository.Params): Promise<void> {
        await Book.updateOne({ userId: book.userId, bookId: book.bookId }, book)
    }
    
    async delete (book: DeleteBookRepository.Params): Promise<void> {
        await Book.deleteOne({ userId: book.userId, bookId: book.bookId })
    }
}