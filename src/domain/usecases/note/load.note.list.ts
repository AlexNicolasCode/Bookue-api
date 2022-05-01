import { NoteResultModel } from "@/domain/models"

export interface LoadNoteList {
    loadAll: (data: LoadNoteList.Params) => Promise<boolean>
}

export namespace LoadNoteList {
    export type Params = NoteResultModel[]
}
