import { DeleteNoteRepository } from "@/data/protocols"
import { NoteModel, NoteResultModel } from "@/domain/models"
import { LoadNotes } from "@/domain/usecases"

import faker from "@faker-js/faker"

export const mockNote = (): NoteModel => ({
    userId: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
    text: faker.random.words(),
    created_at: new Date(),
})

export const mockLoadNote = (): NoteResultModel => ({
    id: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
    created_at: faker.datatype.datetime(),
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
    accessToken: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
})

export const mockDeleteNotesParams = (): DeleteNoteRepository.Params => ({
    accessToken: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
    noteId: faker.datatype.uuid(),
})
