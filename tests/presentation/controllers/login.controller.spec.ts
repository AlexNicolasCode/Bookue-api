import { Authentication } from "@/domain/usecases";
import { MissingParamError } from "@/presentation/errors";
import { badRequest, unauthorized } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import faker from "@faker-js/faker";
import { AuthenticationSpy, ValidationSpy } from "../mocks";

export class LoginController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly authentication: Authentication,
    ) {}

    async handle (request: any): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const authenticationModel = await this.authentication.auth(request)
            if (!authenticationModel) {
                return unauthorized()
            }
        } catch (error) {}
    }
}

const mockRequest = (): SignUpController.Request => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
}

namespace SignUpController {
    export type Request = {
        email: string
        password: string
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
})