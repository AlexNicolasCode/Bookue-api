export interface DeleteBook {
    delete: (data: DeleteBook.Params) => Promise<void>
}

export namespace DeleteBook {
    export type Params = {
        userId: string
        bookId: string
    }
}
