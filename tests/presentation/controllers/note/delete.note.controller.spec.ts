import { DeleteNoteController } from "@/presentation/controllers/note/delete.note";
import { AccessDeniedError } from "@/presentation/errors";
import { serverError } from "@/presentation/helpers";
import { mockDeleteNotesParams, mockLoadNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { DeleteNoteSpy, ValidationSpy } from "tests/presentation/mocks";

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
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 400 if Validation returns error', async () => {
        const { sut, validationSpy } = makeSut()
        const fakeRequest = mockDeleteNotesParams()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toBe(validationSpy.error)
    })

    test('should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const fakeRequest = mockDeleteNotesParams()

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toBe(fakeRequest)
    })

    test('should call DeleteNote with correct values', async () => {
        const { sut, deleteNoteSpy } = makeSut()
        const fakeRequest = mockDeleteNotesParams()

        await sut.handle(fakeRequest)

        expect(deleteNoteSpy.params).toBe(fakeRequest)
    })

    test('should return 500 if DeleteNote throws', async () => {
        const { sut, deleteNoteSpy } = makeSut()
        const fakeRequest = mockDeleteNotesParams()
        jest.spyOn(deleteNoteSpy, 'delete').mockImplementationOnce(throwError)

        const httpReponse = await sut.handle(fakeRequest)

        expect(httpReponse.statusCode).toBe(500)
        expect(httpReponse.body).toStrictEqual(serverError(new Error).body)
    })

    test('should return 403 if DeleteNote returns false', async () => {
        const { sut, deleteNoteSpy } = makeSut()
        const fakeRequest = mockDeleteNotesParams()
        deleteNoteSpy.result = false

        const httpReponse = await sut.handle(fakeRequest)

        expect(httpReponse.statusCode).toBe(403)
        expect(httpReponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = mockDeleteNotesParams()

        const httpReponse = await sut.handle(fakeRequest)

        expect(httpReponse.statusCode).toBe(204)
        expect(httpReponse.body).toBeNull()
    })
})