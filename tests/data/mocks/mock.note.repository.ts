import { AddNoteRepository } from "@/data/protocols"

export class AddNoteRepositorySpy implements AddNoteRepository {
    params: AddNoteRepository.Params
    result = true

    async add (params: AddNoteRepository.Params): Promise<boolean> {
        this.params = params
        return this.result
    }
}
