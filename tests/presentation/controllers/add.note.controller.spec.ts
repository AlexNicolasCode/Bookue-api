import { AddNoteController } from "@/presentation/controllers";
import { AccessDeniedError } from "@/presentation/errors";
import { serverError } from "@/presentation/helpers";
import { mockNoteModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { ValidationSpy, AddNoteSpy } from "../mocks";

type SutType = {
    sut: AddNoteController
    addNoteSpy: AddNoteSpy
    validationSpy: ValidationSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const addNoteSpy = new AddNoteSpy()
    const sut = new AddNoteController(validationSpy, addNoteSpy)
    return {
        sut,
        addNoteSpy,
        validationSpy,
    }
}

describe('AddNoteController', () => {
    test('should return 400 if Validation return error', async () => {
        const { sut, validationSpy } = makeSut()
        const fakeRequest = mockNoteModel()
        validationSpy.error = new Error()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should call Validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const fakeRequest = mockNoteModel()

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toBe(fakeRequest)
    })

    test('should return 500 if AddNote throws', async () => {
        const { sut, addNoteSpy } = makeSut()
        const fakeRequest = mockNoteModel()
        jest.spyOn(addNoteSpy, 'add').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error()).body)
    })
    
    test('should call AddNote with correct values', async () => {
        const { sut, addNoteSpy } = makeSut()
        const fakeRequest = mockNoteModel()

        await sut.handle(fakeRequest)

        expect(addNoteSpy.params).toBe(fakeRequest)
    })

    test('should return 403 if AddNote returns false', async () => {
        const { sut, addNoteSpy } = makeSut()
        const fakeRequest = mockNoteModel()
        addNoteSpy.result = false

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = mockNoteModel()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toBe(204)
        expect(httpResponse.body).toBeNull()
    })
})