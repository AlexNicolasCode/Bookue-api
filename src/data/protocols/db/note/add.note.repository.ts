export interface AddNoteRepository {
    add: (data: AddNoteRepository.Params) => Promise<AddNoteRepository.Result>
}

export namespace AddNoteRepository {
    export type Params = {
        userId: string
        bookId: string
        text: string
    }
    export type Result = {
        id: string
    }
}