export interface AddBook {
    add: (bookData: AddBook.Params) => Promise<void>
}

export namespace AddBook {
    export type Params = {
        title: string,
        author: string,
        description: string,
        currentPage: number,
        pages: number,
        accessToken: string
    }
}
