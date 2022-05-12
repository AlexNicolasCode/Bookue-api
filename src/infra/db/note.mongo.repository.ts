import { AddNoteRepository, LoadNotesRepository } from "@/data/protocols"
import { NoteModel } from "@/domain/models"
import { MongoHelper } from "./mongo.helper"
import { Note, User } from "./mongoose.schemas"

export class NoteMongoRepository implements AddNoteRepository, LoadNotesRepository {
    async add (data: NoteModel): Promise<void> {
        try {
            const account = await User.findOne({ accessToken: data.accessToken })
            await Note.create({
                userId: account.id,
                bookId: data.bookID,
                text: data.text,
                createdAt: new Date()
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    async loadAll (data: LoadNotesRepository.Params): Promise<LoadNotesRepository.Result> {
        try {
            return await MongoHelper.loadNotes(data)
        } catch (error) {
            throw new Error(error)
        }
    }
}
