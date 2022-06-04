
import { DbDeleteNote } from "@/data/usecases"
import { DeleteNote } from "@/domain/usecases"
import { AccountMongoRepository, NoteMongoRepository } from "@/infra"

export const makeDbDeleteNote = (): DeleteNote => {
    const accountMongoRepository = new AccountMongoRepository()
    const noteMongoRepository = new NoteMongoRepository()
    return new DbDeleteNote(accountMongoRepository, noteMongoRepository)
}