import { BookModel } from "../models";

export interface LoadBook {
    load: (userId: string) => Promise<LoadBook.Result>;
};

export namespace LoadBook {
    export type Result = BookModel
};
