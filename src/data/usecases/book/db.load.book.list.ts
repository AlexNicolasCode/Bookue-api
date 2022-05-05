import { LoadBookList } from "@/domain/usecases"
import { LoadBooksRepository } from "@/data/protocols"

export class DbLoadBookList implements LoadBookList {
    constructor (private readonly LoadBooksRepository: LoadBooksRepository) {}

    async load (accessToken: string): Promise<LoadBookList.Result> {
        return await this.LoadBooksRepository.loadAll(accessToken)
    }
}