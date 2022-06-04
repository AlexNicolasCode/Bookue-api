export interface DeleteBookRepository {
    delete: (data: DeleteBookRepository.Params) => Promise<void>
}

export namespace DeleteBookRepository {
    export type Params = {
        userId: string
        bookId: string
    }
}