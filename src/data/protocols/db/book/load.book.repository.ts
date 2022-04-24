import { BookModel } from "@/domain/models";

export interface LoadBookRepository {
    load: (bookData: LoadBookRepository.Params) => Promise<LoadBookRepository.Result>;
};

export namespace LoadBookRepository {
    export type Result = {
        userId: string
    }
    export type Params = BookModel[]
}