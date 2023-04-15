import { UpdateBook } from "@/domain/usecases"
import { UpdateBookRepository } from "@/data/protocols"

export class DbUpdateBook implements UpdateBook {
    constructor (
        private readonly updateBookRepository: UpdateBookRepository,
    ) {}

    async update (data: UpdateBook.Params): Promise<void> {
        await this.updateBookRepository.update({ 
            userId: data.userId, 
            author: data.author,
            title: data.title,
            description: data.description,
            pages: data.pages,
            currentPage: data.currentPage,
            bookId: data.bookId,
        })
    }
}