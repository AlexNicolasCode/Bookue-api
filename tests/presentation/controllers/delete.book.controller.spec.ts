import { DeleteBook } from "@/domain/usecases";
import { AccessDeniedError, ServerError } from "@/presentation/errors";
import { badRequest, forbidden, noContent, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { mockDeleteBookRequest } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { DeleteBookSpy, ValidationSpy } from "../mocks";

export class DeleteBookController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly deleteBook: DeleteBook,
    ) {}
    
    async handle (request: DeleteBook.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const isValid = await this.deleteBook.delete(request)
            if (!isValid) {
                return forbidden(new AccessDeniedError())
            }
            return noContent()
        } catch (error) {
            return serverError(error)
        } 
    }
}

type SutType = {
    sut: DeleteBookController
    validationSpy: ValidationSpy
    deleteBookSpy: DeleteBookSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const deleteBookSpy = new DeleteBookSpy()
    const sut = new DeleteBookController(validationSpy, deleteBookSpy)
    return {
        sut,
        validationSpy,
        deleteBookSpy,
    }
}


describe('DeleteBookController', () => {
    test('should return 400 if Validation return error', async () => {
        const { sut, validationSpy } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })
    
    test('should return 403 if DeleteBook return false', async () => {
        const { sut, deleteBookSpy } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(deleteBookSpy, 'delete').mockResolvedValueOnce(false)
        
        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 500 if DeleteBook throws', async () => {
        const { sut, deleteBookSpy } = makeSut()
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(deleteBookSpy, 'delete').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(500)
        expect(httpResponse.body).toStrictEqual(new ServerError(new Error().stack))
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()
        const fakeRequest = mockDeleteBookRequest()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(204)
        expect(httpResponse.body).toBeNull()
    })
})