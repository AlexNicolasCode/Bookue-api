
import { DbUpdateNote } from "@/data/usecases"
import { UpdateNote } from "@/domain/usecases"
import { NoteMongoRepository } from "@/infra"

export const makeDbUpdateNote = (): UpdateNote => {
    const noteMongoRepository = new NoteMongoRepository()
    return new DbUpdateNote(noteMongoRepository)
}