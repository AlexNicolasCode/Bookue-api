import { AddBook } from "@/domain/usecases";
import { AddBookRepository } from "../protocols";

export class DbAddBook implements AddBook {
    constructor (private readonly addBookRepository: AddBookRepository) {}

    async add (bookData: AddBookRepository.Params): Promise<void> {
        await this.addBookRepository.add(bookData)
    };
}