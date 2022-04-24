import { BookModel } from "../models";

export interface LoadBookList {
    load: (userId: string) => Promise<LoadBookList.Result>;
};

export namespace LoadBookList {
    export type Result = BookModel[]
};
