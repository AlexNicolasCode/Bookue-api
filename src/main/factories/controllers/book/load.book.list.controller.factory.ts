import { LoadBookListController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadBooks } from "@/main/factories/usecases"

export const makeLoadBooksController = (): Controller => {
    const dbLoadList = makeDbLoadBooks()
    const controller = new LoadBookListController(dbLoadList)
    return controller
}