import { LoadBookList } from "@/domain/usecases";
import { LoadBookListRepository } from "../protocols";

export class DbLoadBookList implements LoadBookList {
    constructor (private readonly loadBookListRepository: LoadBookListRepository) {}

    async load (userId: string): Promise<LoadBookList.Result> {
        return await this.loadBookListRepository.load(userId)
    }
}