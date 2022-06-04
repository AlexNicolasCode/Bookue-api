import { DeleteNoteRepository, LoadAccountByTokenRepository } from "@/data/protocols"
import { DeleteNote } from "@/domain/usecases"

export class DbDeleteNote implements DeleteNote {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly deleteNoteRepository: DeleteNoteRepository,
    ) {}

    async delete (data: DeleteNote.Params): Promise<boolean> {
        const account = await this.loadAccountByTokenRepository.loadByToken(data.accessToken)
        if (account) {
            await this.deleteNoteRepository.delete({ 
                userId: account.id, 
                bookId: data.bookId,
                noteId: data.noteId, 
            })
            return true
        }
        return false
    }
}
