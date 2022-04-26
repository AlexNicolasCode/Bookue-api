import { UpdateBook } from "@/domain/usecases/update.book";
import { UpdateBookRepository } from "../protocols";

export class DbUpdateBook implements UpdateBook {
    constructor (private readonly updateBookRepository: UpdateBookRepository) {}

    async update (bookData: UpdateBook.Params): Promise<void> {
        await this.updateBookRepository.update(bookData)
    }
}