
import { DbUpdateNote } from "@/data/usecases"
import { UpdateNote } from "@/domain/usecases"
import { AccountMongoRepository, NoteMongoRepository } from "@/infra"

export const makeDbUpdateNote = (): UpdateNote => {
    const accountMongoRepository = new AccountMongoRepository()
    const noteMongoRepository = new NoteMongoRepository()
    return new DbUpdateNote(accountMongoRepository, noteMongoRepository)
}