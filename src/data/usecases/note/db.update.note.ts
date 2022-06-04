import { LoadAccountByTokenRepository, UpdateNoteRepository } from "@/data/protocols"
import { UpdateNote } from "@/domain/usecases"

export class DbUpdateNote implements UpdateNote {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly updateNoteRepository: UpdateNoteRepository,
    ) {}

    async update (data: UpdateNote.Params): Promise<void> {
        const account = await this.loadAccountByTokenRepository.loadByToken(data.accessToken)
        if (account) {
            await this.updateNoteRepository.update({ 
                userId: account.id, 
                bookId: data.bookId, 
                noteId: data.noteId, 
                text: data.text, 
            })
        }
    }
}