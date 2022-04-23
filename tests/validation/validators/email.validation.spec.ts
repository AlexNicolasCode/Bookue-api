import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";
import { EmailValidator } from "@/validation/protocols";
import { EmailValidationSpy } from "../mocks";

import faker from "@faker-js/faker";
import { throwError } from "tests/domain/mocks/test.helpers";

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

    test('should throw if EmailValidator throws', async () => {
        const { sut, emailValidatorSpy, } = makeSut()
        const email = faker.internet.email()
        jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
        expect(sut.validate).toThrow
    })
})