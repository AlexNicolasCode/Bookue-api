export interface UpdateNoteRepository {
    update: (data: UpdateNoteRepository.Params) => Promise<void>
}

export namespace UpdateNoteRepository {
    export type Params = {
        accessToken: string
        bookId: string
        noteId: string
    }
}
