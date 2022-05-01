import { AddNoteRepository } from "@/data/protocols"

export class AddNoteRepositorySpy implements AddNoteRepository {
    params: AddNoteRepository.Params

    async add (params: AddNoteRepository.Params): Promise<void> {
        this.params = params
    }
}
