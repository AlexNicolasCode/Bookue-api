import { faker } from "@faker-js/faker";

import { DeleteBookController } from "@/presentation/controllers";
import { AccessDeniedError } from "@/presentation/errors";

import { throwError } from "tests/domain/mocks/test.helpers";
import { DeleteBookSpy, ValidationSpy } from "../../mocks";

const mockRequest = (): DeleteBookController.Params => ({
    accessToken: faker.datatype.uuid(),
    bookId: faker.datatype.uuid(),
})

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
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 400 if Validation return error', async () => {
        const { sut, validationSpy } = makeSut()
        jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new Error())

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(400)
        expect(httpResponse.body).toStrictEqual(new Error())
    })
    
    test('should return 403 if DeleteBook return false', async () => {
        const { sut, deleteBookSpy } = makeSut()
        jest.spyOn(deleteBookSpy, 'delete').mockResolvedValueOnce(false)
        
        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })

    test('should return 500 if DeleteBook throws', async () => {
        const { sut, deleteBookSpy } = makeSut()
        jest.spyOn(deleteBookSpy, 'delete').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(500)
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(204)
        expect(httpResponse.body).toBeNull()
    })
})