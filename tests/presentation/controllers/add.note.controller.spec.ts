import { AddNote } from "@/domain/usecases";
import { badRequest } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { mockNoteModel } from "tests/domain/mocks";
import { ValidationSpy } from "../mocks";

class AddNoteController implements Controller {
    constructor (private readonly validation: Validation) {}

    async handle (request: AddNote.Params): Promise<HttpResponse> {
        const error = this.validation.validate(request)
        if (error) {
            return badRequest(error)
        }
        return
    }
}

describe('AddNoteController', () => {
    test('should return 400 if Validation return error', async () => {
        const validationSpy = new ValidationSpy()
        const sut = new AddNoteController(validationSpy)
        const fakeRequest = mockNoteModel()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })
})