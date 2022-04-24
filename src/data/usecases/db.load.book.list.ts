import { LoadBooks } from "@/domain/usecases";
import { LoadBookListRepository } from "../protocols";

export class DbLoadBooks implements LoadBooks {
    constructor (private readonly loadBookListRepository: LoadBookListRepository) {}

    async load (userId: string): Promise<LoadBooks.Result> {
        return await this.loadBookListRepository.load(userId)
    }
}