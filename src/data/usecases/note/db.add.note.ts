import { AddNoteRepository, CheckAccountByAccessTokenRepository } from "@/data/protocols"
import { AddNote } from "@/domain/usecases"

export class DbAddNote implements AddNote {
    constructor (
        private readonly checkAccountByAccessTokenRepository: CheckAccountByAccessTokenRepository,
        private readonly addNoteRepository: AddNoteRepository,
    ) {}

    async add (data: AddNoteRepository.Params): Promise<boolean> {
        const hasAccount = await this.checkAccountByAccessTokenRepository.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            await this.addNoteRepository.add(data)
            return true         
        }
        return false
    }
}
