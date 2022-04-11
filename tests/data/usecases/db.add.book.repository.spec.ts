import { DbAddBook } from "@/data/usecases";
import { mockBookModel } from "tests/domain/mocks";
import { AddBookRepositorySpy } from "../mocks";

describe('DbAddBook', () => {
    test('should send correct bookData', () => {
        const addBookRepositorySpy = new AddBookRepositorySpy();
        const sut = new DbAddBook(addBookRepositorySpy);
        const data = mockBookModel();

        sut.add(data);

        expect(addBookRepositorySpy.bookData).toBe(data);
    })
})