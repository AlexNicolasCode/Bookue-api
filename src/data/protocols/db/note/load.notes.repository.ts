import { LoadNoteList } from "@/domain/usecases"

export interface LoadNotesRepository {
    loadAll: (data: LoadNotesRepository.Params) => Promise<LoadNotesRepository.Result>
}

export namespace LoadNotesRepository {
    export type Params = {
        accessToken: string
        noteId: string
    }
    export type Result = LoadNoteList.Params
}