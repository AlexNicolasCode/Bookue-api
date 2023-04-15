import { DeleteNote } from "@/domain/usecases"
import { DeleteNoteRepository } from "@/data/protocols"

export class DbDeleteNote implements DeleteNote {
    constructor (
        private readonly deleteNoteRepository: DeleteNoteRepository,
    ) {}

    async delete (data: DeleteNote.Params): Promise<void> {
        await this.deleteNoteRepository.delete({ 
            userId: data.userId,
            bookId: data.bookId,
            noteId: data.noteId, 
        })
    }
}
