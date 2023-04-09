import { LoadBooksController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbLoadAccountByToken, makeDbLoadBooks } from "@/main/factories/usecases"

export const makeLoadBooksController = (): Controller => {
    const loadAccountByToken = makeDbLoadAccountByToken()
    const loadList = makeDbLoadBooks()
    return new LoadBooksController(
        loadAccountByToken,
        loadList,
    )
}