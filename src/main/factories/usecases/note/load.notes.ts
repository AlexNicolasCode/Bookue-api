import { DbLoadNotes } from "@/data/usecases"
import { LoadNotes } from "@/domain/usecases"
import { AccountMongoRepository, NoteMongoRepository } from "@/infra"

export const makeDbLoadNotes = (): LoadNotes => {
    const accountMongoRepository = new AccountMongoRepository()
    const noteMongoRepository = new NoteMongoRepository()
    return new DbLoadNotes(accountMongoRepository, noteMongoRepository)
}