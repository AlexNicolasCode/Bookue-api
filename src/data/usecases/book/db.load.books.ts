import { LoadBooks } from "@/domain/usecases"
import { LoadBooksRepository } from "@/data/protocols"

export class DbLoadBooks implements LoadBooks {
    constructor (
        private readonly loadBooksRepository: LoadBooksRepository,
    ) {}

    async load (userId: string): Promise<LoadBooks.Result> {
        return await this.loadBooksRepository.loadAll(userId)
    }
}