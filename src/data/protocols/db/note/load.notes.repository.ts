import { NoteResultModel } from "@/domain/models"

export interface LoadNotesRepository {
    loadAll: (data: LoadNotesRepository.Params) => Promise<LoadNotesRepository.Result>
}

export namespace LoadNotesRepository {
    export type Params = {
        userId: string
        bookdId: string
    }
    export type Result = NoteResultModel[]
}