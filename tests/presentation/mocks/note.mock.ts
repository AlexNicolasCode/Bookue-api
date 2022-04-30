import { AddNote } from "@/domain/usecases"

export class AddNoteSpy implements AddNote {
    params: AddNote.Params
    result = true

    async add (params: AddNote.Params): Promise<boolean> {
        this.params = params
        return this.result
    }
}
