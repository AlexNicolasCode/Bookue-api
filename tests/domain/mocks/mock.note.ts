import { NoteModel, NoteResultModel } from "@/domain/models"

import faker from "@faker-js/faker"

export const mockNoteModel = (): NoteModel => ({
    accessToken: faker.datatype.uuid(),
    bookID: faker.datatype.uuid(),
    text: faker.random.words(),
})

export const mockLoadNote = (): NoteResultModel => ({
    id: faker.datatype.uuid(),
    bookID: faker.datatype.uuid(),
    createdAt: faker.datatype.datetime(),
    text: faker.random.words(),
})

export const mockLoadNotes = (): NoteResultModel[] => ([
    mockLoadNote(),
    mockLoadNote(),
    mockLoadNote(),
    mockLoadNote(),
    mockLoadNote(),
])
