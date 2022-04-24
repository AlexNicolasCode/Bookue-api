import { DbAddBook } from "@/data/usecases";
import { mockAddBookParams } from "tests/domain/mocks";
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
        const bookData = mockAddBookParams();
        
        sut.add(bookData);
        
        expect(addBookRepositorySpy.bookData).toBe(bookData);
    });
    
    test('should throw if addBookRepositorySpy throws', () => {
        const { sut, addBookRepositorySpy } = makeSut();
        jest.spyOn(addBookRepositorySpy, 'add').mockImplementationOnce(throwError)
        const bookData = mockAddBookParams();

        const promise = sut.add(bookData);

        expect(promise).rejects.toThrow()
    });
})