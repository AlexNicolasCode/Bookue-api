import { AddNote, DeleteNote, LoadNotes, UpdateNote } from "@/domain/usecases"
import { mockLoadNotes } from "tests/domain/mocks"

export class AddNoteSpy implements AddNote {
    params: AddNote.Params

    async add (params: AddNote.Params): Promise<void> {
        this.params = params
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
    result = true

    async delete (params: DeleteNote.Params): Promise<DeleteNote.Result> {
        this.params = params
        return this.result
    }
}

export class UpdateNoteSpy implements UpdateNote {
    params: UpdateNote.Params
    result = true

    async update (params: UpdateNote.Params): Promise<void> {
        this.params = params
    }
}
