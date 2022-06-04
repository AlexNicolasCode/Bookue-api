export interface DeleteNoteRepository {
    delete: (data: DeleteNoteRepository.Params) => Promise<void>
}

export namespace DeleteNoteRepository {
    export type Params = {
        userId: string
        bookId: string
        noteId: string
    }
}