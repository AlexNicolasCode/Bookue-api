import { EmailValidatorAdapter } from "@/infra/validators";
import faker from "@faker-js/faker";

import * as validator from 'validator';

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

    test('should return true if validator returns true', () => {
        const sut = new EmailValidatorAdapter()
        const fakeEmail = faker.internet.email()

        const isValid = sut.isValid(fakeEmail)

        expect(isValid).toBe(true)
    })

    test('should call validator with correct email', () => {
        const sut = new EmailValidatorAdapter()
        const fakeEmail = faker.internet.email()
        const isEmailSpy = jest.spyOn(validator, 'isEmail')

        sut.isValid(fakeEmail)

        expect(isEmailSpy).toHaveBeenCalledWith(fakeEmail)
    })
})