import { AddNote } from "@/domain/usecases"
import { AddNoteRepository } from "@/data/protocols"

export class DbAddNote implements AddNote {
    constructor (
        private readonly addNoteRepository: AddNoteRepository,
    ) {}

    async add (data: AddNote.Params): Promise<void> {
        await this.addNoteRepository.add({
            userId: data.userId, 
            bookId: data.bookId, 
            text: data.text,
        })
    }
}
