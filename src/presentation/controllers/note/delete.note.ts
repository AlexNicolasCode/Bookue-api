import { DeleteNote, LoadAccountByToken } from "@/domain/usecases"
import { AccessDeniedError } from "@/presentation/errors"
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class DeleteNoteController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly deleteNote: DeleteNote,
    ) {}

    async handle (request: DeleteNoteController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const account = await this.loadAccountByToken.load(request.accessToken)
            if (!account) {
                return forbidden(new AccessDeniedError())
            }
            await this.deleteNote.delete({
                userId: account.id,
                bookId: request.bookId,
                noteId: request.noteId,
            })
            return noContent()
        } catch (error) {
            return serverError()
        }
    }
}

export namespace DeleteNoteController {
    export type Request = {
        accessToken: string
        bookId: string
        noteId: string
    }
}
