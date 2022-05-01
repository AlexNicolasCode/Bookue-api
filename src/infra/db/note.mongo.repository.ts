import { AddNoteRepository, LoadNotesRepository } from "@/data/protocols"
import { NoteModel } from "@/domain/models"
import { MongoHelper } from "./mongo.helper"

export class NoteMongoRepository implements AddNoteRepository, LoadNotesRepository {
    async add (data: NoteModel): Promise<void> {
        try {
            await MongoHelper.addNote(data)
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
