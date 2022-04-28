export interface AddBookRepository {
    add: (bookData: AddBookRepository.Params) => Promise<void>
}

export namespace AddBookRepository {
    export type Params = {
        title: string
        author: string
        description: string
        currentPage: number
        pages: number
        accessToken: string
    }
}