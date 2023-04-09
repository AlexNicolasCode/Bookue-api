import { BookModel } from "@/domain/models"
import { AddBook, DeleteBook, UpdateBook } from "@/domain/usecases"

import { faker } from '@faker-js/faker'

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
        createdAt: faker.datatype.datetime(),
        userId: faker.datatype.uuid(),
    }
}

export const mockUpdateBookRequest = (): UpdateBook.Params => {
    const currentPage = faker.datatype.number()
    return {
        title: faker.name.fullName(),
        author: faker.name.fullName(),
        description: faker.datatype.string(),
        currentPage: currentPage,
        pages: currentPage + 1,
        userId: faker.datatype.uuid(),
        bookId: faker.datatype.uuid(),
    }
}

export const mockDeleteBookParams = (): DeleteBook.Params => {
    return {
        accessToken: faker.datatype.uuid(),
        bookId: faker.datatype.uuid(),
    }
}