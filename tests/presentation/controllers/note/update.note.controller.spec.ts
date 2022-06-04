import { UpdateNote } from "@/domain/usecases";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { ValidationSpy } from "tests/presentation/mocks";

import faker from "@faker-js/faker";

class UpdateNoteController implements Controller {
    constructor (
        private readonly validation: Validation
    ) {}

    async handle (request: UpdateNote.Params): Promise<HttpResponse> {
        this.validation.validate(request)
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
        const sut = new UpdateNoteController(validationSpy)

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toBe(fakeRequest)
    })
})