import { LoadBookListController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeDbLoadBookList } from "../usecases";

export const makeLoadBookListController = (): Controller => {
    const dbLoadList = makeDbLoadBookList()
    const controller = new LoadBookListController(dbLoadList)
    return controller
}