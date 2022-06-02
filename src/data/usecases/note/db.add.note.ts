import { AddNoteRepository, LoadAccountByTokenRepository } from "@/data/protocols"
import { AddNote } from "@/domain/usecases"

export class DbAddNote implements AddNote {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
        private readonly addNoteRepository: AddNoteRepository,
    ) {}

    async add (data: AddNote.Params): Promise<boolean> {
        const account = await this.loadAccountByTokenRepository.loadByToken(data.accessToken)
        if (account) {
            await this.addNoteRepository.add({
                userId: account.id, 
                bookId: data.bookID, 
                text: data.text,
            })
            return true      
        }
        return false
    }
}
