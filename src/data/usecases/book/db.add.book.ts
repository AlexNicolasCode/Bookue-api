import { AddBook } from "@/domain/usecases"
import { AddBookRepository } from "@/data/protocols"

export class DbAddBook implements AddBook {
    constructor (
        private readonly addBookRepository: AddBookRepository,
    ) {}

    async add (data: AddBook.Params): Promise<void> {
        await this.addBookRepository.add({ 
            title: data.title,
            author: data.author,
            description: data.description,
            currentPage: data.currentPage,
            pages: data.pages,
            userId: data.userId,
            createdAt: data.createdAt,
        })
    }
}