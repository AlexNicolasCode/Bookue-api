import { NoteResultModel } from "@/domain/models"

export interface LoadNotesRepository {
    loadAll: (bookdId: string) => Promise<LoadNotesRepository.Result>
}

export namespace LoadNotesRepository {
    export type Result = NoteResultModel[]
}