export interface DeleteNoteRepository {
    delete: (data: DeleteNoteRepository.Params) => Promise<void>
}

export namespace DeleteNoteRepository {
    export type Params = {
        accessToken: string
        bookId: string
    }
}