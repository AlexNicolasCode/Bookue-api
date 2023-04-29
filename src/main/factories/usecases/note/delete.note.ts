
import { DbDeleteNote } from "@/data/usecases"
import { DeleteNote } from "@/domain/usecases"
import { NoteMongoRepository } from "@/infra"

export const makeDbDeleteNote = (): DeleteNote => {
    const noteMongoRepository = new NoteMongoRepository()
    return new DbDeleteNote(noteMongoRepository)
}