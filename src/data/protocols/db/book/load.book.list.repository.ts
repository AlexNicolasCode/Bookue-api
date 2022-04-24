import { BookModel } from "@/domain/models";

export interface LoadBookListRepository {
    load: (userId: string) => Promise<LoadBookListRepository.Result>;
};

export namespace LoadBookListRepository {
    export type Result = BookModel[]
}