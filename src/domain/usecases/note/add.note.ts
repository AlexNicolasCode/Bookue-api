export interface AddNote {
    add: (data: AddNote.Params) => Promise<void>
}

export namespace AddNote {
    export type Params = {
        userId: string
        bookId: string
        text: string
    }
}
