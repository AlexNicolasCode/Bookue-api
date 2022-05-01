import { LoadNotesController } from "@/presentation/controllers";
import { AccessDeniedError } from "@/presentation/errors";
import { serverError } from "@/presentation/helpers";
import { mockLoadNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadNotesSpy, ValidationSpy } from "../mocks";

type SutType = {
    sut: LoadNotesController
    validationSpy: ValidationSpy
    loadNotesSpy: LoadNotesSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const loadNotesSpy = new LoadNotesSpy()
    const sut = new LoadNotesController(validationSpy, loadNotesSpy)
    return {
        sut,
        validationSpy,
        loadNotesSpy,
    }
}

describe('LoadNotesController', () => {
    test('should return 400 if Vadalition returns error', async () => {
        const { sut, validationSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return 500 if LoadNotes throws', async () => {
        const { sut, loadNotesSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()
        jest.spyOn(loadNotesSpy, 'loadAll').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })

    test('should return 403 if LoadNotes return null', async () => {
        const { sut, loadNotesSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()
        loadNotesSpy.result = null

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 200 on success', async () => {
        const { sut, loadNotesSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toStrictEqual(loadNotesSpy.result)
    })

    test('should return 204 if not found notes', async () => {
        const { sut, loadNotesSpy } = makeSut()
        const fakeRequest = mockLoadNotesParams()
        loadNotesSpy.result = []

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(204)
        expect(httpResponse.body).toBeNull()
    })
})