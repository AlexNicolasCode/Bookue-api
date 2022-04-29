import { DeleteBook } from "@/domain/usecases"
import { CheckAccountByAccessTokenRepository, DeleteBookRepository } from "../protocols"

export class DbDeleteBook implements DeleteBook {
    constructor (
        private readonly checkAccountByAccessTokenRepository: CheckAccountByAccessTokenRepository,
        private readonly deleteBookRepository: DeleteBookRepository,
    ) {}

    async delete (data: DeleteBook.Params): Promise<boolean> {
        const hasAccount = await this.checkAccountByAccessTokenRepository.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            await this.deleteBookRepository.delete(data)
            return true
        }
    }
}