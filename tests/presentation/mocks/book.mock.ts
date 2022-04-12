import { AddBook } from "@/domain/usecases";

export class AddBookSpy implements AddBook {
    params: AddBook.Params

    async add (params: AddBook.Params): Promise<void> {
        this.params = params
    }
}