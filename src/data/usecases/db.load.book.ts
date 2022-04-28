import { LoadBook } from "@/domain/usecases"
import { LoadBookRepository } from "../protocols"

export class DbLoadBook implements LoadBook {
    constructor (private readonly loadBookRepository: LoadBookRepository) {}

    async load (data: LoadBook.Request): Promise<LoadBook.Result> {
        return await this.loadBookRepository.loadOne(data)
    }
}
