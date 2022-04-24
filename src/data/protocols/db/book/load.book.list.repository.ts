import { BookModel } from "@/domain/models";

export interface LoadBookListRepository {
    loadAll: (userId: string) => Promise<LoadBookListRepository.Result>;
};

export namespace LoadBookListRepository {
    export type Result = BookModel[]
}