import { BookModel } from "../models"

export interface LoadBook {
    load: (data: LoadBook.Request) => Promise<LoadBook.Result>
}

export namespace LoadBook {
    export type Request = {
        accessToken: string 
        bookId: string
    }
    export type Result = BookModel
}