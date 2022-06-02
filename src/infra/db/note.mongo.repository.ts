import { AddNoteRepository, LoadNotesRepository, DeleteNoteRepository } from "@/data/protocols"
import { Note } from "./mongoose.schemas"

export class NoteMongoRepository implements AddNoteRepository, LoadNotesRepository, DeleteNoteRepository {
    async add (data: AddNoteRepository.Params): Promise<void> {
        await Note.create({
            userId: data.userId,
            bookId: data.bookId,
            text: data.text,
            createdAt: new Date()
        })
    }

    async loadAll (bookId: string): Promise<LoadNotesRepository.Result> {
        return await Note.find({ bookId: bookId })
    }

    async delete (data: DeleteNoteRepository.Params): Promise<void> {
        await Note.deleteOne({ id: data.noteId, bookId: data.bookId })
    }
}
