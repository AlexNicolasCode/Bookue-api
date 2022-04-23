import { EmailValidator } from "@/validation/protocols";
import faker from "@faker-js/faker";

import * as validator from 'validator';

export class EmailValidatorAdapter implements EmailValidator {
    isValid (email: string): boolean {
        return validator.isEmail(email)
    }
}

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}))

describe('EmailValidatorAdapter', () => {
    test('should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter()
        const fakeEmail = faker.internet.email()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

        const isValid = sut.isValid(fakeEmail)

        expect(isValid).toBe(false)
    })
})