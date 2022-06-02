import { AddNoteRepository, LoadNotesRepository, DeleteNoteRepository } from "@/data/protocols"
import { NoteModel } from "@/domain/models"
import { Note, User } from "./mongoose.schemas"

export class NoteMongoRepository implements AddNoteRepository, LoadNotesRepository, DeleteNoteRepository {
    async add (data: NoteModel): Promise<void> {
        const account = await User.findOne({ accessToken: data.accessToken })
        await Note.create({
            userId: account.id,
            bookId: data.bookID,
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
