import { AddNoteRepository, DeleteNoteRepository, LoadNotesRepository } from "@/data/protocols"
import { NoteResultModel } from "@/domain/models"
import { mockLoadNotes } from "tests/domain/mocks"

export class AddNoteRepositorySpy implements AddNoteRepository {
    params: AddNoteRepository.Params

    async add (params: AddNoteRepository.Params): Promise<void> {
        this.params = params
    }
}

export class LoadNotesRepositorySpy implements LoadNotesRepository {
    bookId: string
    result = mockLoadNotes()

    async loadAll (bookId: string): Promise<NoteResultModel[]> {
        this.bookId = bookId
        return this.result
    }
}

export class DeleteNoteRepositorySpy implements DeleteNoteRepository {
    params: DeleteNoteRepository.Params

    async delete (params: DeleteNoteRepository.Params): Promise<void> {
        this.params = params
    }
}
