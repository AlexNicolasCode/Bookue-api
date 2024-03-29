import { BookModel } from "@/domain/models"

export interface LoadBookRepository {
    loadOne: (data: LoadBookRepository.Request) => Promise<LoadBookRepository.Result>
}

export namespace LoadBookRepository {
    export type Request = {
        userId: string 
        bookId: string 
    }
    export type Result = BookModel
}