import { AddNoteRepository, LoadNotesRepository, DeleteNoteRepository, UpdateNoteRepository } from "@/data/protocols"
import { Note } from "./mongoose.schemas"

export class NoteMongoRepository implements AddNoteRepository, LoadNotesRepository, DeleteNoteRepository, UpdateNoteRepository {
    async add (data: AddNoteRepository.Params): Promise<void> {
        await Note.create({
            userId: data.userId,
            bookId: data.bookId,
            text: data.text,
            createdAt: new Date()
        })
    }

    async loadAll (data: LoadNotesRepository.Params): Promise<LoadNotesRepository.Result> {
        return await Note.find({
            userId: data.userId,
            bookId: data.bookId,
        })
    }

    async delete (data: DeleteNoteRepository.Params): Promise<void> {
        await Note.deleteOne({ 
            _id: data.noteId, 
            bookId: data.bookId,
            userId: data.userId,
        })
    }

    async update (note: UpdateNoteRepository.Params): Promise<void> {
        await Note.updateOne({ 
            _id: note.noteId,
            userId: note.userId,
            bookId: note.bookId,
        }, note)
    }
}
