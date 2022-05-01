import { NoteResultModel } from "@/domain/models"

export interface LoadNotes {
    loadAll: (data: LoadNotes.Params) => Promise<boolean>
}

export namespace LoadNotes {
    export type Params = NoteResultModel[]
}
