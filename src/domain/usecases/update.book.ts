export interface UpdateBook {
    update: (bookData: UpdateBook.Params) => Promise<void>
}

export namespace UpdateBook {
    export type Params = {
        title?: string
        author?: string
        description?: string
        currentPage?: number
        pages?: number
        accessToken: string
        bookId: string
    }
}
