import { BookModel } from "@/domain/models";

export interface LoadBookRepository {
    load: (userId: string) => Promise<LoadBookRepository.Result>;
};

export namespace LoadBookRepository {
    export type Result = BookModel[]
}