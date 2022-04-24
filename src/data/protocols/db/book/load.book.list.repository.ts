import { BookModel } from "@/domain/models";

export interface LoadBooksRepository {
    load: (userId: string) => Promise<LoadBooksRepository.Result>;
};

export namespace LoadBooksRepository {
    export type Result = BookModel[]
}