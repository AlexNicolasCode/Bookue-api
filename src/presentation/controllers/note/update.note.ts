import { UpdateNote } from "@/domain/usecases"
import { badRequest, noContent, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse, Validation } from "@/presentation/protocols"

export class UpdateNoteController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly updateNote: UpdateNote,
    ) {}

    async handle (request: UpdateNote.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            await this.updateNote.update(request)
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}