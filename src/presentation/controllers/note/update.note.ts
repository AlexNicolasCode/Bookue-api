import { LoadAccountByToken, UpdateNote } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse, Validation } from "@/presentation/protocols"

export class UpdateNoteController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly updateNote: UpdateNote,
    ) {}

    async handle (request: UpdateNoteController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const account = await this.loadAccountByToken.load(request.accessToken)
            if (!account) {
                return forbidden(new AccessDeniedError())
            }
            await this.updateNote.update({
                userId: account.id,
                bookId: request.bookId,
                noteId: request.noteId,
                text: request.text,
            })
            return noContent()
        } catch (error) {
            return serverError()
        }
    }
}

export namespace UpdateNoteController {
    export type Request = {
        accessToken: string
        bookId: string
        noteId: string
        text: string
    }
}