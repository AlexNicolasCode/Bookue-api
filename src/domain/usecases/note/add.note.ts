import { NoteModel } from "@/domain/models"

export interface AddNote {
    add: (data: AddNote.Params) => Promise<boolean>
}

export namespace AddNote {
    export type Params = NoteModel
}