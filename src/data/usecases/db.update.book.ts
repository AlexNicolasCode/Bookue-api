import { UpdateBook } from "@/domain/usecases/update.book"
import { CheckAccountByAccessTokenRepository, UpdateBookRepository } from "../protocols"

export class DbUpdateBook implements UpdateBook {
    constructor (
        private readonly checkAccountByAccessToken: CheckAccountByAccessTokenRepository,
        private readonly updateBookRepository: UpdateBookRepository,
    ) {}

    async update (data: UpdateBook.Params): Promise<UpdateBook.Result> {
        const hasAccount = await this.checkAccountByAccessToken.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            await this.updateBookRepository.update(data)
            return true
        }
    }
}