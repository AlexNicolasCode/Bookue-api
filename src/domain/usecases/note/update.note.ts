export interface UpdateNote {
    update: (data: UpdateNote.Params) => Promise<void>
}

export namespace UpdateNote {
    export type Params = {
        accessToken: string
        bookId: string
        noteId: string
    }
}
