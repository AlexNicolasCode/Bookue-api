import { BookModel } from "@/domain/models";

export interface AddBookRepository {
    add: (bookData: AddBookRepository.Params) => Promise<void>;
};

export namespace AddBookRepository {
    export type Params = BookModel
}