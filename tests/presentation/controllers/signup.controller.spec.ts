import { MissingParamError } from "@/presentation/errors";
import { badRequest } from "@/presentation/helpers";
import { Controller, HttpReponse, Validation } from "@/presentation/protocols";
import faker from "@faker-js/faker";
import { throwError } from "tests/domain/mocks/test.helpers";
import { ValidationSpy } from "../mocks";

export class SignUpController implements Controller {
    constructor (
        private validation: Validation,
    ) {}

    async handle (request: any): Promise<HttpReponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
        } catch (e) {}
    }
}

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
    sut: SignUpController,
    validationSpy: ValidationSpy,
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const sut = new SignUpController(validationSpy)
    return {
        sut,
        validationSpy,
    }
}

describe('SignUpController', () => {
    test('should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy, } = makeSut()
        validationSpy.error = new MissingParamError(faker.random.word())

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse).toStrictEqual(badRequest(validationSpy.error))
    })
})