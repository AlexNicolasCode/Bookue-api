import { AddNote } from "@/domain/usecases";
import { badRequest, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { mockNoteModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { ValidationSpy } from "../mocks";
import { AddNoteSpy } from "../mocks/note.mock";

class AddNoteController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly addNote: AddNote,
    ) {}

    async handle (request: AddNote.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            await this.addNote.add(request)
        } catch (error) {
            return serverError(error)
        }
    }
}

describe('AddNoteController', () => {
    test('should return 400 if Validation return error', async () => {
        const validationSpy = new ValidationSpy()
        const addNoteSpy = new AddNoteSpy()
        const sut = new AddNoteController(validationSpy, addNoteSpy)
        const fakeRequest = mockNoteModel()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return 500 if AddNote throws', async () => {
        const validationSpy = new ValidationSpy()
        const addNoteSpy = new AddNoteSpy()
        const sut = new AddNoteController(validationSpy, addNoteSpy)
        const fakeRequest = mockNoteModel()
        jest.spyOn(addNoteSpy, 'add').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })
})