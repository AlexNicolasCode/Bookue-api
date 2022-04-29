export interface DeleteBook {
    delete: (data: DeleteBook.Params) => Promise<DeleteBook.Result>
}

export namespace DeleteBook {
    export type Params = {
        userId: string
        bookId: string
    }
    export type Result = boolean
}
