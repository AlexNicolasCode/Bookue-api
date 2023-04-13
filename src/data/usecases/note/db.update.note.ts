import { UpdateNoteRepository } from "@/data/protocols"
import { UpdateNote } from "@/domain/usecases"

export class DbUpdateNote implements UpdateNote {
    constructor (
        private readonly updateNoteRepository: UpdateNoteRepository,
    ) {}

    async update (data: UpdateNote.Params): Promise<void> {
        await this.updateNoteRepository.update({ 
            userId: data.userId, 
            bookId: data.bookId, 
            noteId: data.noteId, 
            text: data.text, 
        })
    }
}