export interface AddNote {
    add: (data: AddNote.Params) => Promise<AddNote.Result>
}

export namespace AddNote {
    export type Params = {
        userId: string
        bookId: string
        text: string
    }
    export type Result = {
        id: string
    }
}
