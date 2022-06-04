import { LoadNotesRepository, CheckAccountByAccessTokenRepository } from "@/data/protocols"
import { NoteResultModel } from "@/domain/models"
import { LoadNotes } from "@/domain/usecases"

export class DbLoadNotes implements LoadNotes {
    constructor (
        private readonly checkAccountByAccessToken: CheckAccountByAccessTokenRepository,
        private readonly loadNotesRepository: LoadNotesRepository,
    ) {}

    async loadAll (data: LoadNotes.Params): Promise<NoteResultModel[]> {
        const hasAccount = await this.checkAccountByAccessToken.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            return await this.loadNotesRepository.loadAll(data.bookId)
        }
    }
}
