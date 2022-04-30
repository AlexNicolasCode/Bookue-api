import { AddNote } from "@/domain/usecases"

export interface AddNoteRepository {
    add: (data: AddNoteRepository.Params) => Promise<void>
}

export namespace AddNoteRepository {
    export type Params = AddNote.Params
}