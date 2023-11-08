import { AddNote, LoadAccountByToken } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class AddNoteController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addNote: AddNote,
        private readonly loadAccountByToken: LoadAccountByToken,
    ) {}

    async handle (request: AddNoteController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const account = await this.loadAccountByToken.load(request.accessToken)
            if (!account) {
                return forbidden(new AccessDeniedError())
            }
            const note = await this.addNote.add({
                userId: account.id,
                bookId: request.bookId,
                text: request.text,
            })
            return ok({ id: note.id })
        } catch (error) {
            return serverError()
        }
    }
}

export namespace AddNoteController {
    export type Request = {
        accessToken: string
        bookId: string
        text: string
    }
}