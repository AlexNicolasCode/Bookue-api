import { AddNoteRepository, LoadNotesRepository } from "@/data/protocols"
import { NoteModel } from "@/domain/models"
import { Note, User } from "./mongoose.schemas"

export class NoteMongoRepository implements AddNoteRepository, LoadNotesRepository {
    async add (data: NoteModel): Promise<void> {
        const account = await User.findOne({ accessToken: data.accessToken })
        await Note.create({
            userId: account.id,
            bookId: data.bookID,
            text: data.text,
            createdAt: new Date()
        })
    }

    async loadAll (data: LoadNotesRepository.Params): Promise<LoadNotesRepository.Result> {
        const account = await User.findOne({ accessToken: data.accessToken })
        return Note.find({ userId: account.id, bookId: data.bookId })
    }
}
