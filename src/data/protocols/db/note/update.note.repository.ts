export interface UpdateNoteRepository {
    update: (data: UpdateNoteRepository.Params) => Promise<void>
}

export namespace UpdateNoteRepository {
    export type Params = {
        userId: string
        bookId: string
        noteId: string
    }
}
