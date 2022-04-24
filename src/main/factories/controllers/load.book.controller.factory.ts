import { LoadBookController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeDbLoadBook } from "../usecases";

export const makeLoadBookController = (): Controller => {
    const dbLoadBook = makeDbLoadBook()
    return new LoadBookController(dbLoadBook)
}