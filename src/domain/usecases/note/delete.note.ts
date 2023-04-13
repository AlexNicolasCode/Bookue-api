export interface DeleteNote {
    delete: (data: DeleteNote.Params) => Promise<void>
}

export namespace DeleteNote {
    export type Params = {
        userId: string
        bookId: string
        noteId: string
    }
    export type Result = boolean
}
