import { LoadBookController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadAccountByToken, makeDbLoadBook } from "@/main/factories/usecases"

export const makeLoadBookController = (): Controller => {
    const loadAccountByToken = makeDbLoadAccountByToken()
    const loadBook = makeDbLoadBook()
    return new LoadBookController(
        loadAccountByToken,
        loadBook,
    )
}