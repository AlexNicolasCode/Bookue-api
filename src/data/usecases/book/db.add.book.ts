import { AddBook } from "@/domain/usecases"
import { AddBookRepository, Hasher } from "@/data/protocols"

export class DbAddBook implements AddBook {
    constructor (
        private readonly addBookRepository: AddBookRepository,
        private readonly hasher: Hasher,
    ) {}

    async add (data: AddBook.Params): Promise<void> {
        const hash = await this.hasher.hash(`${data.title}-${data.createdAt}`)
        await this.addBookRepository.add({
            title: data.title,
            author: data.author,
            description: data.description,
            currentPage: data.currentPage,
            pages: data.pages,
            slug: hash,
            userId: data.userId,
            createdAt: data.createdAt,
        })
    }
}