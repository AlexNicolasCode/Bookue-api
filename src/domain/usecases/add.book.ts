import { BookModel } from "../models"

export interface AddBook {
    add: (bookData: AddBook.Params) => Promise<void>;
};

export namespace AddBook {
    export type Params = BookModel;
};
