export interface UpdateBookRepository {
    update: (bookData: UpdateBookRepository.Params) => Promise<void>
}

export namespace UpdateBookRepository {
    export type Params = {
        title?: string
        author?: string
        description?: string
        currentPage?: number
        pages?: number
        userId: string
        bookId: string
        noteId: string
    }
}