export interface UpdateNote {
    update: (data: UpdateNote.Params) => Promise<UpdateNote.Result>
}

export namespace UpdateNote {
    export type Params = {
        accessToken: string
        bookId: string
        noteId: string
    }
    export type Result = boolean
}
