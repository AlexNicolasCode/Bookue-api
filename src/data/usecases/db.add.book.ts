import { BookModel } from "@/domain/models";
import { AddBook } from "@/domain/usecases";
import { AddBookRepository } from "../protocols";

export class DbAddBook implements AddBook {
    constructor (private readonly addBookRepository: AddBookRepository) {}

    async add (bookData: BookModel): Promise<void> {
        await this.addBookRepository.add(bookData)
    };
}