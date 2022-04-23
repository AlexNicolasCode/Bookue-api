import { MissingParamError } from "@/presentation/errors";
import { badRequest } from "@/presentation/helpers";
import { Controller, HttpReponse, Validation } from "@/presentation/protocols";
import faker from "@faker-js/faker";
import { ValidationSpy } from "../mocks";

export class LoginController implements Controller {
    constructor (
        private readonly validation: Validation,
    ) {}

    async handle (request: any): Promise<HttpReponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
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

describe('LoginController', () => {
    test('should return 400 when validation fails', async () => {
        const validationSpy = new ValidationSpy()
        const sut = new LoginController(validationSpy)
        const fakeRequest = mockRequest()
        validationSpy.error = new MissingParamError(faker.random.word())

        const httpResponse = await sut.handle(fakeRequest)

        expect(httpResponse).toStrictEqual(badRequest(validationSpy.error))
    })
})