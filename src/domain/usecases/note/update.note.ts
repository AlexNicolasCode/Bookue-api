export interface UpdateNote {
    update: (data: UpdateNote.Params) => Promise<void>
}

export namespace UpdateNote {
    export type Params = {
        userId: string
        bookId: string
        noteId: string
        text: string
    }
}
