import { BookModel } from "@/domain/models"

export interface LoadBooksRepository {
    loadAll: (accessToken: string) => Promise<LoadBooksRepository.Result>
}

export namespace LoadBooksRepository {
    export type Result = BookModel[]
}