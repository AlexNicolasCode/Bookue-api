import { NoteResultModel } from "@/domain/models"

export interface LoadNotes {
    loadAll: (data: LoadNotes.Params) => Promise<LoadNotes.Result>
}

export namespace LoadNotes {
    export type Params = {
        accessToken: string
        bookId: string
    }
    export type Result = NoteResultModel[]
}
