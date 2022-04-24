import { BookModel } from "../models";

export interface LoadBooks {
    load: (bookData: LoadBooks.Params) => Promise<LoadBooks.Result>;
};

export namespace LoadBooks {
    export type Params = {
        userId: string
    }
    export type Result = BookModel[]
};
