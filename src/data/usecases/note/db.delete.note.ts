import { CheckAccountByAccessTokenRepository, DeleteNoteRepository } from "@/data/protocols"
import { DeleteNote } from "@/domain/usecases"

export class DbDeleteNote implements DeleteNote {
    constructor (
        private readonly checkAccountByAccessTokenRepository: CheckAccountByAccessTokenRepository,
        private readonly deleteNoteRepository: DeleteNoteRepository,
    ) {}

    async delete (data: DeleteNote.Params): Promise<boolean> {
        const hasAccount = await this.checkAccountByAccessTokenRepository.checkByAccessToken(data.accessToken)
        if (hasAccount) {
            await this.deleteNoteRepository.delete(data)
            return true
        }
    }
}
