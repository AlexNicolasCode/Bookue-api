import { NoteModel } from "@/domain/models"

import faker from "@faker-js/faker"

export const mockNoteModel = (): NoteModel => ({
    accessToken: faker.datatype.uuid(),
    bookID: faker.datatype.uuid(),
    text: faker.random.words(),
})
