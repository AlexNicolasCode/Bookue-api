import { DeleteNote } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class DeleteNoteController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly deleteNote: DeleteNote,
    ) {}

    async handle (request: DeleteNote.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const isDeleted = await this.deleteNote.delete(request)
            if (!isDeleted) {
                return forbidden(new AccessDeniedError())
            }
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}
