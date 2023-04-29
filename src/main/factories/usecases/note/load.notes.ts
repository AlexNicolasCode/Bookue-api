import { DbLoadNotes } from "@/data/usecases"
import { LoadNotes } from "@/domain/usecases"
import { NoteMongoRepository } from "@/infra"

export const makeDbLoadNotes = (): LoadNotes => {
    const noteMongoRepository = new NoteMongoRepository()
    return new DbLoadNotes(noteMongoRepository)
}