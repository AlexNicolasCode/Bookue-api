import { BookModel } from "@/domain/models"

export interface LoadBooks {
    load: (accessToken: string) => Promise<LoadBooks.Result>
}

export namespace LoadBooks {
    export type Result = BookModel[]
}
