import { AddNoteRepository, LoadNotesRepository } from "@/data/protocols"
import { NoteResultModel } from "@/domain/models"
import { mockLoadNotes } from "tests/domain/mocks"

export class AddNoteRepositorySpy implements AddNoteRepository {
    params: AddNoteRepository.Params

    async add (params: AddNoteRepository.Params): Promise<void> {
        this.params = params
    }
}

export class LoadNotesRepositorySpy implements LoadNotesRepository {
    params: LoadNotesRepository.Params
    result = mockLoadNotes()

    async loadAll (params: LoadNotesRepository.Params): Promise<NoteResultModel[]> {
        this.params = params
        return this.result
    }
}
