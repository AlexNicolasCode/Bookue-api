import { LoadBooks } from "@/domain/usecases"
import { LoadBooksRepository } from "@/data/protocols"

export class DbLoadBooks implements LoadBooks {
    constructor (private readonly LoadBooksRepository: LoadBooksRepository) {}

    async load (accessToken: string): Promise<LoadBooks.Result> {
        return await this.LoadBooksRepository.loadAll(accessToken)
    }
}