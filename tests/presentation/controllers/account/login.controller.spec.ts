import { MissingParamError } from "@/presentation/errors"
import { badRequest, unauthorized } from "@/presentation/helpers"
import { throwError } from "tests/domain/mocks/test.helpers"
import { AuthenticationSpy, ValidationSpy } from "../../mocks"
import { LoginController } from "@/presentation/controllers"

import faker from "@faker-js/faker"

const mockRequest = (): LoginController.Request => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
}

type SutType = {
    sut: LoginController
    authenticationSpy: AuthenticationSpy
    validationSpy: ValidationSpy
}

const makeSut = (): SutType => {
    const authenticationSpy = new AuthenticationSpy()
    const validationSpy = new ValidationSpy()
    const sut = new LoginController(validationSpy, authenticationSpy)
    return {
        sut,
        authenticationSpy,
        validationSpy,
    }
}

describe('LoginController', () => {
    test('should return 400 when validation fails', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockRequest()
        validationSpy.error = new MissingParamError(faker.random.word())

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(badRequest(validationSpy.error))
    })

    test('should return 401 when user is unauthorized', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()
        authenticationSpy.result = null

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(unauthorized())
    })

    test('should return 200 on success', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(200)
    })

    test('should return accessToken on success', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body.accessToken).toStrictEqual(authenticationSpy.result.accessToken)
    })

    test('should return user name on success', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.body.name).toStrictEqual(authenticationSpy.result.name)
    })

    test('should return 500 if Validation throws', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockRequest()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(500)
    })

    test('should return 500 if Authentication throws', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()
        jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse.statusCode).toStrictEqual(500)
    })
})