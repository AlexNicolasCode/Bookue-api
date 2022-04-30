import { DeleteBook } from "@/domain/usecases";
import { AccessDeniedError } from "@/presentation/errors";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { mockDeleteBookRequest } from "tests/domain/mocks";
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
        } catch (error) {
            return serverError(error)
        } 
        return
    }
}

describe('DeleteBookController', () => {
    test('should return 400 if Validation return error', async () => {
        const validationSpy = new ValidationSpy()
        const deleteBookSpy = new DeleteBookSpy()
        const sut = new DeleteBookController(validationSpy, deleteBookSpy)
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })

    test('should return 403 if DeleteBook return false', async () => {
        const validationSpy = new ValidationSpy()
        const deleteBookSpy = new DeleteBookSpy()
        const sut = new DeleteBookController(validationSpy, deleteBookSpy)
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(deleteBookSpy, 'delete').mockResolvedValueOnce(false)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })
})