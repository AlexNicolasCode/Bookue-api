import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";
import { EmailValidator } from "@/validation/protocols";
import { EmailValidationSpy } from "../mocks";

import faker from "@faker-js/faker";

export class EmailValidation implements Validation {
    constructor (
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator,
    ) {}

    validate (input: any): Error {
        const isValid = this.emailValidator.isValid(input[this.fieldName])
        if (!isValid) {
            return new InvalidParamError(this.fieldName)
        }
    }
}

const field = faker.random.word()

describe('EmailValidation', () => {
    test('should return an error if EmailValidator returns false', async () => {
        const emailValidatorSpy = new EmailValidationSpy()
        const sut = new EmailValidation(field, emailValidatorSpy)
        emailValidatorSpy.isEmailValid = false
        const email = faker.internet.email()

        const error = sut.validate({ [field]: email })

        expect(error).toStrictEqual(new InvalidParamError(field))
    })
})