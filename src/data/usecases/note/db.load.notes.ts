import { LoadNotesRepository } from "@/data/protocols"
import { NoteResultModel } from "@/domain/models"
import { LoadNotes } from "@/domain/usecases"

export class DbLoadNotes implements LoadNotes {
    constructor (
        private readonly loadNotesRepository: LoadNotesRepository,
    ) {}

    async loadAll (data: LoadNotes.Params): Promise<NoteResultModel[]> {
        return await this.loadNotesRepository.loadAll({
            userId: data.userId,
            bookId: data.bookId,
        })
    }
}
