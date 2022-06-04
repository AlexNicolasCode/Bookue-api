import { BookModel } from "@/domain/models"
import { AddBook, DeleteBook, UpdateBook } from "@/domain/usecases"

import faker from '@faker-js/faker'

export const mockBook = (): BookModel => {
    return {
        title: faker.random.words(),
        author: faker.random.word(),
        description: faker.random.words(),
        currentPage: faker.datatype.number(),
        pages: faker.datatype.number(),
    }
}

export const mockAddBookParams = (): AddBook.Params => {
    return {
        title: faker.random.words(),
        author: faker.random.word(),
        description: faker.random.words(),
        currentPage: faker.datatype.number(),
        pages: faker.datatype.number(),
        accessToken: faker.datatype.uuid(),
    }
}

export const mockUpdateBookRequest = (): UpdateBook.Params => {
    const currentPage = faker.datatype.number()
    return {
        title: faker.name.findName(),
        author: faker.name.findName(),
        description: faker.datatype.string(),
        currentPage: currentPage,
        pages: currentPage + 1,
        accessToken: faker.datatype.uuid(),
        bookId: faker.datatype.uuid(),
    }
}

export const mockDeleteBookParams = (): DeleteBook.Params => {
    return {
        accessToken: faker.datatype.uuid(),
        bookId: faker.datatype.uuid(),
    }
}