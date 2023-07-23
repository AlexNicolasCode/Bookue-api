import { LoadAccountByToken, LoadNotes } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, ok, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class LoadNotesController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly loadNotes: LoadNotes,
    ) {}

    async handle (request: LoadNotesController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const account = await this.loadAccountByToken.load(request.accessToken)
            if (!account) {
                return forbidden(new AccessDeniedError())
            }
            const notes = await this.loadNotes.loadAll({
                userId: account.id,
                bookId: request.bookId,
            })
            return notes.length ? ok(notes) : noContent()
        } catch (error) {
            return serverError()
        }
    }
}

export namespace LoadNotesController {
    export type Request = {
        accessToken: string
        bookId: string
    }
}
