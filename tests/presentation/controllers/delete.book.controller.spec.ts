import { DeleteBook } from "@/domain/usecases";
import { badRequest, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { mockDeleteBookRequest } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { ValidationSpy } from "../mocks";

export class DeleteBookController implements Controller {
    constructor (private readonly validation: Validation) {}
    
    async handle (request: DeleteBook.Params): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
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
        const sut = new DeleteBookController(validationSpy)
        const fakeRequest = mockDeleteBookRequest()
        jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })
})