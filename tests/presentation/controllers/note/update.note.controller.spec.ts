import { LoadAccountByTokenSpy, UpdateNoteSpy, ValidationSpy } from "tests/presentation/mocks";
import { serverError } from "@/presentation/helpers";
import { throwError } from "tests/domain/mocks/test.helpers";
import { UpdateNoteController } from "@/presentation/controllers";

import { faker } from "@faker-js/faker";
import { AccessDeniedError } from "@/presentation/errors";

type SutTypes = {
    sut: UpdateNoteController
    validationSpy: ValidationSpy
    updateNoteSpy: UpdateNoteSpy
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const updateNoteSpy = new UpdateNoteSpy()
    const sut = new UpdateNoteController(
        validationSpy,
        loadAccountByTokenSpy,
        updateNoteSpy,
    )
    return {
        sut,
        validationSpy,
        updateNoteSpy,
        loadAccountByTokenSpy,
    }
}

describe('UpdateNoteController', () => {
    let fakeRequest: UpdateNoteController.Request

    beforeEach(() => {
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
            noteId: faker.datatype.uuid(),
            text: faker.random.words(),
        }
    })

    test('should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toBe(fakeRequest)
    })

    test('should return 400 if validation return error', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toBe(validationSpy.error)
    })

    test('should call UpdateNote with correct values', async () => {
        const { sut, updateNoteSpy, loadAccountByTokenSpy } = makeSut()

        await sut.handle(fakeRequest)

        expect(updateNoteSpy.params).toStrictEqual({
            userId: loadAccountByTokenSpy.result.id,
            bookId: fakeRequest.bookId,
            noteId: fakeRequest.noteId,
            text: fakeRequest.text,
        })
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(204)
        expect(httpResponse.body).toBeNull()
    })

    test('should return 403 if LoadAccountByToken not found an account', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        loadAccountByTokenSpy.result = undefined

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 500 if UpdateNote throws', async () => {
        const { sut, updateNoteSpy } = makeSut()
        jest.spyOn(updateNoteSpy, 'update').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })
})