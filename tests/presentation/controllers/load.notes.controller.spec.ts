import { LoadNotes } from "@/domain/usecases";
import { badRequest } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { mockLoadNotesParams } from "tests/domain/mocks";
import { ValidationSpy } from "../mocks";

export class LoadNotesController implements Controller {
    constructor (private readonly validation: Validation) {}

    async handle (request: LoadNotes.Params): Promise<HttpResponse> {
        const error = this.validation.validate(request)
        if (error) {
            return badRequest(error)
        }
        return
    }
}

describe('LoadNotesController', () => {
    test('should return 400 if Vadalition returns error', async () => {
        const validationSpy = new ValidationSpy()
        const sut = new LoadNotesController(validationSpy)
        const fakeRequest = mockLoadNotesParams()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })
})