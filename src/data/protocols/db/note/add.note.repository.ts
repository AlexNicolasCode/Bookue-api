import { AddNote } from "@/domain/usecases"

export interface AddNoteRepository {
    add: (data: AddNoteRepository.Params) => Promise<boolean>
}

export namespace AddNoteRepository {
    export type Params = AddNote.Params
}