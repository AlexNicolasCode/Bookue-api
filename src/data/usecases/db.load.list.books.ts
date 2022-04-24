import { LoadBooks } from "@/domain/usecases";
import { LoadBooksRepository } from "../protocols";

export class DbLoadBooks implements LoadBooks {
    constructor (private readonly loadBooksRepository: LoadBooksRepository) {}

    async load (userId: string): Promise<LoadBooks.Result> {
        return await this.loadBooksRepository.load(userId)
    }
}