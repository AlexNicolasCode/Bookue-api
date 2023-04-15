import { LoadNotesController } from "@/presentation/controllers";
import { AccessDeniedError } from "@/presentation/errors";
import { serverError } from "@/presentation/helpers";

import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadAccountByTokenSpy, LoadNotesSpy, ValidationSpy } from "../../mocks";

import { faker } from "@faker-js/faker";

type SutType = {
    sut: LoadNotesController
    validationSpy: ValidationSpy
    loadNotesSpy: LoadNotesSpy
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const loadNotesSpy = new LoadNotesSpy()
    const sut = new LoadNotesController(
        validationSpy,
        loadAccountByTokenSpy,
        loadNotesSpy,
    )
    return {
        sut,
        validationSpy,
        loadNotesSpy,
        loadAccountByTokenSpy,
    }
}

describe('LoadNotesController', () => {
    let fakeRequest: LoadNotesController.Request

    beforeEach(() => {
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
        }
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 400 if Vadalition returns error', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return 500 if LoadNotes throws', async () => {
        const { sut, loadNotesSpy } = makeSut()
        jest.spyOn(loadNotesSpy, 'loadAll').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })

    test('should return 403 if LoadAccountByToken not found an account', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        loadAccountByTokenSpy.result = undefined

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 200 on success', async () => {
        const { sut, loadNotesSpy } = makeSut()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toStrictEqual(loadNotesSpy.result)
    })

    test('should return 204 if not found notes', async () => {
        const { sut, loadNotesSpy } = makeSut()
        loadNotesSpy.result = []

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(204)
        expect(httpResponse.body).toBeNull()
    })
})