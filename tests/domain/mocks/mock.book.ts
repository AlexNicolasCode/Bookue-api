import { UpdateBookRepository } from "@/data/protocols";
import { BookModel } from "@/domain/models";
import { AddBook } from "@/domain/usecases";

import faker from '@faker-js/faker';

export const mockBookModel = (): BookModel => {
    return {
        title: faker.random.words(),
        author: faker.random.word(),
        description: faker.random.words(),
        currentPage: faker.datatype.number(),
        pages: faker.datatype.number(),
    };
};

export const mockAddBookParams = (): AddBook.Params => {
    return {
        title: faker.random.words(),
        author: faker.random.word(),
        description: faker.random.words(),
        currentPage: faker.datatype.number(),
        pages: faker.datatype.number(),
        userId: faker.datatype.uuid(),
    };
};

export const mockUpdateBookRequest = (): UpdateBookRepository.Params => {
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