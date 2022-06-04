import { DeleteBook } from "@/domain/usecases"
import { DeleteBookRepository, LoadAccountByTokenRepository } from "@/data/protocols"

export class DbDeleteBook implements DeleteBook {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly deleteBookRepository: DeleteBookRepository,
    ) {}

    async delete (data: DeleteBook.Params): Promise<boolean> {
        const account = await this.loadAccountByTokenRepository.loadByToken(data.accessToken)
        if (account) {
            await this.deleteBookRepository.delete({ userId: account.id, bookId: data.bookId })
            return true
        }
        return false
    }
}