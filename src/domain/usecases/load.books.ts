import { BookModel } from "../models";

export interface LoadBooks {
    load: (userId: string) => Promise<LoadBooks.Result>;
};

export namespace LoadBooks {
    export type Result = BookModel[]
};
