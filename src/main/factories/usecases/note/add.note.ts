import { DbAddNote } from "@/data/usecases"
import { AddNote } from "@/domain/usecases"
import { NoteMongoRepository } from "@/infra"

export const makeDbAddNote = (): AddNote => {
    const noteMongoRepository = new NoteMongoRepository()
    return new DbAddNote(noteMongoRepository)
}