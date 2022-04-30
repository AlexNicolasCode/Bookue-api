import { AddNote } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class AddNoteController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addNote: AddNote,
    ) {}

    async handle (request: AddNote.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const isValid = await this.addNote.add(request)
            if (!isValid) {
                return forbidden(new AccessDeniedError())
            }
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}
