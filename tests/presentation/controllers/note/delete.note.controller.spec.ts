import { DeleteNote } from "@/domain/usecases";
import { badRequest } from "@/presentation/helpers";
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
        const error = this.validation.validate(request)
        if (error) {
            return badRequest(error)
        }
        await this.deleteNote.delete(request)
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
})