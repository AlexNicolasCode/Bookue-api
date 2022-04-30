export interface DeleteBook {
    delete: (data: DeleteBook.Params) => Promise<DeleteBook.Result>
}

export namespace DeleteBook {
    export type Params = {
        accessToken: string
        bookId: string
    }
    export type Result = boolean
}
