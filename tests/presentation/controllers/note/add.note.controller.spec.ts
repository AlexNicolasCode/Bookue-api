import { AddNoteController } from "@/presentation/controllers";
import { AccessDeniedError } from "@/presentation/errors";
import { serverError } from "@/presentation/helpers";
import { throwError } from "tests/domain/mocks/test.helpers";
import { ValidationSpy, AddNoteSpy, LoadAccountByTokenSpy } from "../../mocks";

import { faker } from "@faker-js/faker";

type SutType = {
    sut: AddNoteController
    addNoteSpy: AddNoteSpy
    validationSpy: ValidationSpy
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const addNoteSpy = new AddNoteSpy()
    const sut = new AddNoteController(
        validationSpy,
        addNoteSpy,
        loadAccountByTokenSpy,
    )
    return {
        sut,
        addNoteSpy,
        validationSpy,
        loadAccountByTokenSpy,
    }
}

describe('AddNoteController', () => {
    let fakeRequest: AddNoteController.Request

    beforeEach(() => {
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
            text: faker.random.words(),
        }
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 400 if Validation return error', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toBe(fakeRequest)
    })

    test('should return 500 if AddNote throws', async () => {
        const { sut, addNoteSpy } = makeSut()
        jest.spyOn(addNoteSpy, 'add').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError().body)
    })
    
    test('should call AddNote with correct values', async () => {
        const { sut, addNoteSpy, loadAccountByTokenSpy } = makeSut()

        await sut.handle(fakeRequest)

        expect(addNoteSpy.params).toStrictEqual({
            userId: loadAccountByTokenSpy.result.id,
            bookId: fakeRequest.bookId,
            text: fakeRequest.text,
        })
    })

    test('should return 403 if LoadAccountByToken should not return an acccount', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        loadAccountByTokenSpy.result = undefined

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(204)
        expect(httpResponse.body).toBeNull()
    })
})