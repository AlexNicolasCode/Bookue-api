import { faker } from "@faker-js/faker"

import { AddNote, DeleteNote, LoadNotes, UpdateNote } from "@/domain/usecases"
import { mockLoadNotes } from "tests/domain/mocks"

export class AddNoteSpy implements AddNote {
    params: AddNote.Params
    result = { id: faker.datatype.uuid() }

    async add (params: AddNote.Params): Promise<AddNote.Result> {
        this.params = params
        return this.result
    }
}

export class LoadNotesSpy implements LoadNotes {
    params: LoadNotes.Params
    result = mockLoadNotes()

    async loadAll (params: LoadNotes.Params): Promise<LoadNotes.Result> {
        this.params = params
        return this.result
    }
}

export class DeleteNoteSpy implements DeleteNote {
    params: DeleteNote.Params

    async delete (params: DeleteNote.Params): Promise<void> {
        this.params = params
    }
}

export class UpdateNoteSpy implements UpdateNote {
    params: UpdateNote.Params
    result = true

    async update (params: UpdateNote.Params): Promise<void> {
        this.params = params
    }
}
