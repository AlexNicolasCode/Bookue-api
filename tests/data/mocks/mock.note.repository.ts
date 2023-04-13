import { 
    AddNoteRepository, 
    DeleteNoteRepository, 
    LoadNotesRepository, 
    UpdateNoteRepository, 
} from "@/data/protocols"
import { NoteResultModel } from "@/domain/models"
import { mockLoadNotes } from "tests/domain/mocks"

export class AddNoteRepositorySpy implements AddNoteRepository {
    params: AddNoteRepository.Params

    async add (params: AddNoteRepository.Params): Promise<void> {
        this.params = params
    }
}

export class LoadNotesRepositorySpy implements LoadNotesRepository {
    data: LoadNotesRepository.Params
    result = mockLoadNotes()

    async loadAll (data: LoadNotesRepository.Params): Promise<NoteResultModel[]> {
        this.data = data
        return this.result
    }
}

export class DeleteNoteRepositorySpy implements DeleteNoteRepository {
    params: DeleteNoteRepository.Params

    async delete (params: DeleteNoteRepository.Params): Promise<void> {
        this.params = params
    }
}

export class UpdateNoteRepositorySpy implements UpdateNoteRepository {
    params: UpdateNoteRepository.Params

    async update (params: UpdateNoteRepository.Params): Promise<void> {
        this.params = params
    }
}
