import { LoadNotes } from "@/domain/usecases";
import { AccessDeniedError } from "@/presentation/errors";
import { badRequest, forbidden, noContent, ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { mockLoadNotesParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadNotesSpy, ValidationSpy } from "../mocks";

export class LoadNotesController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly loadNotes: LoadNotes,
    ) {}

    async handle (request: LoadNotes.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const notes = await this.loadNotes.loadAll(request)
            if (!notes) {
                return forbidden(new AccessDeniedError())
            }
            return notes.length ? ok(notes) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

describe('LoadNotesController', () => {
    test('should return 400 if Vadalition returns error', async () => {
        const validationSpy = new ValidationSpy()
        const loadNotesSpy = new LoadNotesSpy()
        const sut = new LoadNotesController(validationSpy, loadNotesSpy)
        const fakeRequest = mockLoadNotesParams()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return 500 if LoadNotes throws', async () => {
        const validationSpy = new ValidationSpy()
        const loadNotesSpy = new LoadNotesSpy()
        const sut = new LoadNotesController(validationSpy, loadNotesSpy)
        const fakeRequest = mockLoadNotesParams()
        jest.spyOn(loadNotesSpy, 'loadAll').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })

    test('should return 403 if LoadNotes return null', async () => {
        const validationSpy = new ValidationSpy()
        const loadNotesSpy = new LoadNotesSpy()
        const sut = new LoadNotesController(validationSpy, loadNotesSpy)
        const fakeRequest = mockLoadNotesParams()
        loadNotesSpy.result = null

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 200 on success', async () => {
        const validationSpy = new ValidationSpy()
        const loadNotesSpy = new LoadNotesSpy()
        const sut = new LoadNotesController(validationSpy, loadNotesSpy)
        const fakeRequest = mockLoadNotesParams()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toStrictEqual(loadNotesSpy.result)
    })

    test('should return 204 if not found notes', async () => {
        const validationSpy = new ValidationSpy()
        const loadNotesSpy = new LoadNotesSpy()
        const sut = new LoadNotesController(validationSpy, loadNotesSpy)
        const fakeRequest = mockLoadNotesParams()
        loadNotesSpy.result = []

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(204)
        expect(httpResponse.body).toBeNull()
    })
})