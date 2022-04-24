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