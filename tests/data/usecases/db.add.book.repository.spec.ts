import { DbAddBook } from "@/data/usecases";
import { mockBookModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { AddBookRepositorySpy } from "../mocks";

type SutTypes = {
    sut: DbAddBook
    addBookRepositorySpy: AddBookRepositorySpy
}

const makeSut = (): SutTypes => {
    const addBookRepositorySpy = new AddBookRepositorySpy();
    const sut = new DbAddBook(addBookRepositorySpy);
    return {
        sut,
        addBookRepositorySpy
    }
}

describe('DbAddBook', () => {
    test('should send correct bookData', () => {
        const { sut, addBookRepositorySpy } = makeSut();
        const bookData = mockBookModel();
        
        sut.add(bookData);
        
        expect(addBookRepositorySpy.bookData).toBe(bookData);
    });
})