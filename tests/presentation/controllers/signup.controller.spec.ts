import { AddAccount } from "@/domain/usecases";
import { MissingParamError } from "@/presentation/errors";
import { badRequest } from "@/presentation/helpers";
import { Controller, HttpReponse, Validation } from "@/presentation/protocols";
import { AddAccountSpy, ValidationSpy } from "../mocks";

import faker from "@faker-js/faker";

export class SignUpController implements Controller {
    constructor (
        private addAccount: AddAccount,
        private validation: Validation,
    ) {}

    async handle (request: any): Promise<HttpReponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const { name, email, password } = request
            await this.addAccount.add({
                name,
                email,
                password
            })
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
    addAccountSpy: AddAccountSpy
}

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy()
    const addAccountSpy = new AddAccountSpy()
    const sut = new SignUpController(addAccountSpy, validationSpy)
    return {
        sut,
        validationSpy,
        addAccountSpy,
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
})