import { NoteModel, NoteResultModel } from "@/domain/models"
import { DeleteNote, LoadNotes } from "@/domain/usecases"

import { faker } from "@faker-js/faker"

export const mockNote = (params?: Partial<NoteModel>): NoteModel => ({
    userId: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
    text: faker.random.words(),
    createdAt: new Date(),
    ...params
})

export const mockLoadNote = (): NoteResultModel => ({
    id: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
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

export const mockLoadNotesParams = (): LoadNotes.Params => ({
    userId: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
})

export const mockDeleteNotesParams = (): DeleteNote.Params => ({
    userId: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
    noteId: faker.datatype.uuid(),
})
