import { InvalidParamError } from "@/presentation/errors"
import { EmailValidationSpy } from "../mocks"
import { EmailValidation } from "@/validation/validators"

import { faker } from "@faker-js/faker"

type SutType = {
    sut: EmailValidation
    emailValidatorSpy: EmailValidationSpy
}

const field = faker.random.word()

const makeSut = (): SutType => {
    const emailValidatorSpy = new EmailValidationSpy()
    const sut = new EmailValidation(field, emailValidatorSpy)
    return {
        sut,
        emailValidatorSpy,
    }
}

describe('EmailValidation', () => {
    test('should return an error if EmailValidator returns false', async () => {
        const { sut, emailValidatorSpy, } = makeSut()
        emailValidatorSpy.isEmailValid = false
        const email = faker.internet.email()

        const error = sut.validate({ [field]: email })

        expect(error).toStrictEqual(new InvalidParamError(field))
    })

    test('should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorSpy, } = makeSut()
        const email = faker.internet.email()

        sut.validate({ [field]: email })

        expect(emailValidatorSpy.email).toBe(email)
    })
})