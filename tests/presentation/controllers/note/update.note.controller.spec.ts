import { UpdateNote } from "@/domain/usecases";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { UpdateNoteSpy, ValidationSpy } from "tests/presentation/mocks";
import { badRequest } from "@/presentation/helpers";

import faker from "@faker-js/faker";

class UpdateNoteController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly updateNote: UpdateNote,
    ) {}

    async handle (request: UpdateNote.Params): Promise<HttpResponse> {
        const error = this.validation.validate(request)
        if (error) {
            return badRequest(error)
        }
        await this.updateNote.update(request)
        return
    }
}

describe('UpdateNoteController', () => {
    let fakeRequest: UpdateNote.Params

    beforeEach(() => {
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
            noteId: faker.datatype.uuid(),
            text: faker.random.words(),
        }
    })

    test('should call Validation with correct values', async () => {
        const validationSpy = new ValidationSpy()
        const updateNoteSpy = new UpdateNoteSpy()
        const sut = new UpdateNoteController(validationSpy, updateNoteSpy)

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toBe(fakeRequest)
    })

    test('should return 400 if validation return error', async () => {
        const validationSpy = new ValidationSpy()
        const updateNoteSpy = new UpdateNoteSpy()
        const sut = new UpdateNoteController(validationSpy, updateNoteSpy)
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toBe(validationSpy.error)
    })

    test('should call UpdateNote with correct values', async () => {
        const validationSpy = new ValidationSpy()
        const updateNoteSpy = new UpdateNoteSpy()
        const sut = new UpdateNoteController(validationSpy, updateNoteSpy)

        await sut.handle(fakeRequest)

        expect(updateNoteSpy.params).toBe(fakeRequest)
    })
})