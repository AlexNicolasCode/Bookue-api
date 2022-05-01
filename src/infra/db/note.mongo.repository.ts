import { AddNoteRepository } from "@/data/protocols"
import { NoteModel } from "@/domain/models"
import { MongoHelper } from "./mongo.helper"

export class NoteMongoRepository implements AddNoteRepository {
    async add (data: NoteModel): Promise<void> {
        try {
            await MongoHelper.addNote(data)
        } catch (error) {
            throw new Error(error)
        }
    }
}
