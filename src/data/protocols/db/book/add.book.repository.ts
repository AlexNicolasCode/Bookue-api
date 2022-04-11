import { AddBook } from "@/domain/usecases";

export interface AddBookRepository {
    add: (data: AddBookRepository.Params) => Promise<void>;
};

export namespace AddBookRepository {
    export type Params = AddBook
}