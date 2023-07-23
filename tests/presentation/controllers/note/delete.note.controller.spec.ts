import { DeleteNoteController } from "@/presentation/controllers/note/delete.note";
import { AccessDeniedError } from "@/presentation/errors";
import { serverError } from "@/presentation/helpers";

import { throwError } from "tests/domain/mocks/test.helpers";
import { DeleteNoteSpy, LoadAccountByTokenSpy, ValidationSpy } from "tests/presentation/mocks";

import { faker } from "@faker-js/faker";

type SutType = {
    sut: DeleteNoteController
    validationSpy: ValidationSpy
    deleteNoteSpy: DeleteNoteSpy
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutType => {
    const deleteNoteSpy = new DeleteNoteSpy()
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const validationSpy = new ValidationSpy()
    const sut = new DeleteNoteController(
        validationSpy,
        loadAccountByTokenSpy,
        deleteNoteSpy,
    )
    return {
        sut,
        validationSpy,
        deleteNoteSpy,
        loadAccountByTokenSpy
    }
}

describe('DeleteNoteController', () => {
    let fakeRequest: DeleteNoteController.Request

    beforeEach(() => {
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
            noteId: faker.datatype.uuid(),
        }
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 400 if Validation returns error', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toBe(validationSpy.error)
    })

    test('should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toBe(fakeRequest)
    })

    test('should call DeleteNote with correct values', async () => {
        const { sut, deleteNoteSpy, loadAccountByTokenSpy } = makeSut()

        await sut.handle(fakeRequest)

        expect(deleteNoteSpy.params).toStrictEqual({
            userId: loadAccountByTokenSpy.result.id,
            bookId: fakeRequest.bookId,
            noteId: fakeRequest.noteId,
        })
    })

    test('should return 500 if DeleteNote throws', async () => {
        const { sut, deleteNoteSpy } = makeSut()
        jest.spyOn(deleteNoteSpy, 'delete').mockImplementationOnce(throwError)

        const httpReponse = await sut.handle(fakeRequest)

        expect(httpReponse.statusCode).toBe(500)
        expect(httpReponse.body).toStrictEqual(serverError().body)
    })

    test('should return 403 if LoadAccountByToken not found an account', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        loadAccountByTokenSpy.result = undefined

        const httpReponse = await sut.handle(fakeRequest)

        expect(httpReponse.statusCode).toBe(403)
        expect(httpReponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()

        const httpReponse = await sut.handle(fakeRequest)

        expect(httpReponse.statusCode).toBe(204)
        expect(httpReponse.body).toBeNull()
    })
})