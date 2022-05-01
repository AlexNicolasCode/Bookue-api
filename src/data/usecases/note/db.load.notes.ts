import { LoadNotesRepository, CheckAccountByAccessTokenRepository } from "@/data/protocols"
import { NoteResultModel } from "@/domain/models"

export class DbLoadNotes implements LoadNotesRepository {
    constructor (
        private readonly checkAccountByAccessToken: CheckAccountByAccessTokenRepository,
        private readonly loadNotesRepository: LoadNotesRepository,
    ) {}

    async loadAll (data: LoadNotesRepository.Params): Promise<NoteResultModel[]> {
        const hasAccount = await this.checkAccountByAccessToken.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            return this.loadNotesRepository.loadAll(data)
        }
    }
}
