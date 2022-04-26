import { UpdateBook } from "@/domain/usecases";
import { UpdateBookRepository } from "@/data/protocols";
import { UpdateBookRepositorySpy } from "../mocks";
import { BookModel } from "@/domain/models";
import { throwError } from "tests/domain/mocks/test.helpers";

import faker from "@faker-js/faker";

export class DbUpdateBook implements UpdateBook {
    constructor (private readonly updateBookRepository: UpdateBookRepository) {}

    async update (bookData: UpdateBook.Params): Promise<void> {
        await this.updateBookRepository.update(bookData)
    }
}

interface UpdateBookRequest extends BookModel {
    userId: string
    bookId: string
}

const mockUpdateBookRequest = (): UpdateBookRequest => {
    const currentPage = faker.datatype.number()
    return {
        title: faker.name.findName(),
        author: faker.name.findName(),
        description: faker.datatype.string(),
        currentPage: currentPage,
        pages: currentPage + 1,
        userId: faker.datatype.uuid(),
        bookId: faker.datatype.uuid(),
    }
}

describe('DbUpdateBook', () => {
    test('should throw if UpdateBookRepository throws', async () => {
        const updateBookRepositorySpy = new UpdateBookRepositorySpy()
        const sut = new DbUpdateBook(updateBookRepositorySpy)
        const fakeBook = mockUpdateBookRequest()   
        jest.spyOn(updateBookRepositorySpy, 'update').mockImplementationOnce(throwError)     

        const promise = sut.update(fakeBook)

        expect(promise).rejects.toThrowError()
    })

    test('should call UpdateBookRepository with correct values', async () => {
        const updateBookRepositorySpy = new UpdateBookRepositorySpy()
        const sut = new DbUpdateBook(updateBookRepositorySpy)
        const fakeBook = mockUpdateBookRequest()   

        await sut.update(fakeBook)

        expect(updateBookRepositorySpy.params).toBe(fakeBook)
    })
})