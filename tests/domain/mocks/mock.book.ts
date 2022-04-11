import { BookModel } from "@/domain/models";

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