import { UpdateBook } from "@/domain/usecases"
import { LoadAccountByTokenRepository, UpdateBookRepository } from "@/data/protocols"

export class DbUpdateBook implements UpdateBook {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly updateBookRepository: UpdateBookRepository,
    ) {}

    async update (data: UpdateBook.Params): Promise<UpdateBook.Result> {
        const account = await this.loadAccountByTokenRepository.loadByToken(data.accessToken)
        if (account) {
            await this.updateBookRepository.update({ 
                userId: account.id, 
                author: data.author,
                title: data.title,
                description: data.description,
                pages: data.pages,
                currentPage: data.currentPage,
                bookId: data.bookId,
            })
            return true
        }
        return false
    }
}