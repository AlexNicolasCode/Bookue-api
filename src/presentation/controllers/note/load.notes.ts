import { LoadNotes } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, ok, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class LoadNotesController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly loadNotes: LoadNotes,
    ) {}

    async handle (request: LoadNotes.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const notes = await this.loadNotes.loadAll(request)
            if (!notes) {
                return forbidden(new AccessDeniedError())
            }
            return notes.length ? ok(notes) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}
