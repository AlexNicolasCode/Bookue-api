import { NoteModel } from "@/domain/models"

export interface AddNote {
    add: (data: AddNote.Params) => Promise<void>
}

export namespace AddNote {
    export type Params = NoteModel
}
