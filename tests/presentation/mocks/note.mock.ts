import { AddNote, LoadNotes } from "@/domain/usecases"
import { mockLoadNotes } from "tests/domain/mocks"

export class AddNoteSpy implements AddNote {
    params: AddNote.Params
    result = true

    async add (params: AddNote.Params): Promise<boolean> {
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
