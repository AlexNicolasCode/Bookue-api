import { AddBookRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";
import { AddBook } from "@/domain/usecases";
import { mockBookModel } from "tests/domain/mocks";
import { AddBookRepositorySpy } from "../mocks";

export class DbAddBook implements AddBook {
    constructor (private readonly addBookRepository: AddBookRepository) {}

    async add (bookData: BookModel): Promise<void> {
        await this.addBookRepository.add(bookData)
    };
}

describe('DbAddBook', () => {
    test('should send correct bookData', () => {
        const addBookRepositorySpy = new AddBookRepositorySpy();
        const sut = new DbAddBook(addBookRepositorySpy);
        const data = mockBookModel();

        sut.add(data);

        expect(addBookRepositorySpy.bookData).toBe(data);
    })
})