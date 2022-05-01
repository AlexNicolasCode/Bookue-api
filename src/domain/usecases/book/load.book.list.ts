import { BookModel } from "@/domain/models"

export interface LoadBookList {
    load: (accessToken: string) => Promise<LoadBookList.Result>
}

export namespace LoadBookList {
    export type Result = BookModel[]
}
