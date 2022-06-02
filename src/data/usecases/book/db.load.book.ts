import { LoadBook } from "@/domain/usecases"
import { LoadAccountByTokenRepository, LoadBookRepository } from "@/data/protocols"

export class DbLoadBook implements LoadBook {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly loadBookRepository: LoadBookRepository,
    ) {}

    async load (data: LoadBook.Request): Promise<LoadBook.Result> {
        const account = await this.loadAccountByTokenRepository.loadByToken(data.accessToken)
        if (account) {
            return await this.loadBookRepository.loadOne({ userId: account.id, bookId: data.bookId })
        }
    }
}
