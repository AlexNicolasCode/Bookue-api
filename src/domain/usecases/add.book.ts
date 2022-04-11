import { BookModel } from "../models"

export interface AddBook {
    add: (book: AddBook.Params) => Promise<void>;
};

export namespace AddBook {
    export type Params = BookModel;
};
