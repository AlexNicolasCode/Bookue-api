import { NoteResultModel } from "@/domain/models"

export interface LoadNotesRepository {
    loadAll: (data: LoadNotesRepository.Params) => Promise<LoadNotesRepository.Result>
}

export namespace LoadNotesRepository {
    export type Params = {
        accessToken: string
        noteId: string
    }
    export type Result = NoteResultModel
}