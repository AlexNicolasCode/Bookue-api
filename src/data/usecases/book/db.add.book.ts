import { AddBook } from "@/domain/usecases"
import { AddBookRepository, LoadAccountByTokenRepository } from "@/data/protocols"

export class DbAddBook implements AddBook {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly addBookRepository: AddBookRepository,
    ) {}

    async add (data: AddBook.Params): Promise<void> {
        const account = await this.loadAccountByTokenRepository.loadByToken(data.accessToken)
        if (account) {
            await this.addBookRepository.add({ 
                userId: account.id,
                ...data,
            })
        }
    }
}