export interface AddNoteRepository {
    add: (data: AddNoteRepository.Params) => Promise<void>
}

export namespace AddNoteRepository {
    export type Params = {
        userId: string
        bookId: string
        text: string
    }
}