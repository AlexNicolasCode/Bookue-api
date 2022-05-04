export interface DeleteNote {
    delete: (data: DeleteNote.Params) => Promise<DeleteNote.Result>
}

export namespace DeleteNote {
    export type Params = {
        accessToken: string
        bookId: string
    }
    export type Result = boolean
}
