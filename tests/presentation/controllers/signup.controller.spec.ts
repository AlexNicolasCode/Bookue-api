import { EmailAlreadyUsed, MissingParamError } from "@/presentation/errors"
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers"
import { AddAccountSpy, AuthenticationSpy, ValidationSpy } from "../mocks"
import { throwError } from "tests/domain/mocks/test.helpers"

import faker from "@faker-js/faker"
import { SignUpController } from "@/presentation/controllers"

const mockRequest = (): SignUpController.Request => {
    const password = faker.internet.password()
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
}

namespace SignUpController {
    export type Request = {
        name: string
        email: string
        password: string
        passwordConfirmation: string
    }
}

type SutType = {
    sut: SignUpController
    validationSpy: ValidationSpy
    addAccountSpy: AddAccountSpy
    authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const addAccountSpy = new AddAccountSpy()
    const authenticationSpy = new AuthenticationSpy()
    const sut = new SignUpController(addAccountSpy, validationSpy, authenticationSpy)
    return {
        sut,
        validationSpy,
        addAccountSpy,
        authenticationSpy,
    }
}

describe('SignUpController', () => {
    test('should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy, } = makeSut()
        validationSpy.error = new MissingParamError(faker.random.word())

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse).toStrictEqual(badRequest(validationSpy.error))
    })

    test('should call Validation with correct values', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockRequest()

        await sut.handle(fakeRequest)

        expect(validationSpy.input).toStrictEqual(fakeRequest)
    })

    test('should throw if Validation throws', async () => {
        const { sut, validationSpy, } = makeSut()
        const fakeRequest = mockRequest()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(serverError(new Error()))
    })

    test('should call AddAccount with correct values', async () => {
        const { sut, addAccountSpy, } = makeSut()
        const fakeRequest = mockRequest()

        await sut.handle(fakeRequest)

        expect(addAccountSpy.params).toStrictEqual({
            name: fakeRequest.name,
            email: fakeRequest.email,
            password: fakeRequest.password 
        })
    })

    test('should return 403 if AddAccount returns false', async () => {
        const { sut, addAccountSpy, } = makeSut()
        const fakeRequest = mockRequest()
        addAccountSpy.result = false

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(forbidden(new EmailAlreadyUsed()))
    })

    test('should throw if AddAccount throws', async () => {
        const { sut, addAccountSpy, } = makeSut()
        const fakeRequest = mockRequest()
        jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(serverError(new Error()))
    })

    test('should call Authentication with correct values', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()

        await sut.handle(fakeRequest)

        expect(authenticationSpy.params).toStrictEqual({
            email: fakeRequest.email,
            password: fakeRequest.password,
        })
    })

    test('should call Authentication with correct values', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()

        await sut.handle(fakeRequest)

        expect(authenticationSpy.params).toStrictEqual({
            email: fakeRequest.email,
            password: fakeRequest.password,
        })
    })

    test('should throw if Authentication throws', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()
        jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(serverError(new Error()))
    })

    test('should return 200 if valid data is provided', async () => {
        const { sut, authenticationSpy, } = makeSut()
        const fakeRequest = mockRequest()

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(ok(authenticationSpy.result))
    })
})