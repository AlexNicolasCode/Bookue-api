import { BookModel } from "@/domain/models"

export interface LoadBook {
    load: (data: LoadBook.Request) => Promise<LoadBook.Result>
}

export namespace LoadBook {
    export type Request = {
        userId: string 
        slug: string
    }
    export type Result = BookModel
}
