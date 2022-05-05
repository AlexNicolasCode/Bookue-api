import { DeleteNote } from "@/domain/usecases";
import { AccessDeniedError } from "@/presentation/errors";
import { badRequest, forbidden, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { mockLoadNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { DeleteNoteSpy, ValidationSpy } from "tests/presentation/mocks";

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
        } catch (error) {
            return serverError(error)
        }
    }
}

type SutType = {
    sut: DeleteNoteController
    validationSpy: ValidationSpy
    deleteNoteSpy: DeleteNoteSpy
}

const makeSut = (): SutType => {
    const deleteNoteSpy = new DeleteNoteSpy()
    const validationSpy = new ValidationSpy()
    const sut = new DeleteNoteController(validationSpy, deleteNoteSpy)
    return {
        sut,
        validationSpy,
        deleteNoteSpy,
    }
}

describe('DeleteNoteController', () => {
    test('should return 400 if Validation returns error', async () => {
        const { sut, validationSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toBe(validationSpy.error)
    })

    test('should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toBe(fakeRequest)
    })

    test('should call DeleteNote with correct values', async () => {
        const { sut, deleteNoteSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()

        await sut.handle(fakeRequest)

        expect(deleteNoteSpy.params).toBe(fakeRequest)
    })

    test('should return 500 if DeleteNote throws', async () => {
        const { sut, deleteNoteSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()
        jest.spyOn(deleteNoteSpy, 'delete').mockImplementationOnce(throwError)

        const httpReponse = await sut.handle(fakeRequest)

        expect(httpReponse.statusCode).toBe(500)
        expect(httpReponse.body).toStrictEqual(serverError(new Error).body)
    })

    test('should return 403 if DeleteNote returns false', async () => {
        const { sut, deleteNoteSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()
        deleteNoteSpy.result = false

        const httpReponse = await sut.handle(fakeRequest)

        expect(httpReponse.statusCode).toBe(403)
        expect(httpReponse.body).toStrictEqual(new AccessDeniedError())
    })
})