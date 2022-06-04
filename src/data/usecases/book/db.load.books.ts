import { LoadBooks } from "@/domain/usecases"
import { LoadAccountByTokenRepository, LoadBooksRepository } from "@/data/protocols"

export class DbLoadBooks implements LoadBooks {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly loadBooksRepository: LoadBooksRepository,
    ) {}

    async load (accessToken: string): Promise<LoadBooks.Result> {
        const account = await this.loadAccountByTokenRepository.loadByToken(accessToken)
        if (account) {
            return await this.loadBooksRepository.loadAll(account.id)
        }
    }
}