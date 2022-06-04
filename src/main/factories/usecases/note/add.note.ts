import { DbAddNote } from "@/data/usecases"
import { AddNote } from "@/domain/usecases"
import { AccountMongoRepository, NoteMongoRepository } from "@/infra"

export const makeDbAddNote = (): AddNote => {
    const accountMongoRepository = new AccountMongoRepository()
    const noteMongoRepository = new NoteMongoRepository()
    return new DbAddNote(accountMongoRepository, noteMongoRepository)
}