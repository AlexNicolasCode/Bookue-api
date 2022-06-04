export interface AddNote {
    add: (data: AddNote.Params) => Promise<boolean>
}

export namespace AddNote {
    export type Params = {
        accessToken: string
        bookId: string
        text: string
    }
}
