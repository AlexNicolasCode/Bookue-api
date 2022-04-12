import { MissingParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";
import { ValidationSpy } from "tests/presentation/mocks";

import faker from "@faker-js/faker";

const field = faker.random.word()

export class ValidationComposite implements Validation {
    constructor (private readonly validation: Validation[]) {}

    validate (input: any): Error {
        for (const validation of this.validation) {
            const error = validation.validate(input)
            if (error) {
                return error
            }
        }
    }
}

type SutType = {
    sut: ValidationComposite
    validateSpies: ValidationSpy[]
}

const makeSut = (): SutType => {
    const validateSpies = [
        new ValidationSpy(),
        new ValidationSpy(),
    ] 
    const sut = new ValidationComposite(validateSpies)
    return {
        sut,
        validateSpies,
    }
}

describe('ValidationComposite', () => {
    test('should return an error if any validation fails', () => {
        const { sut, validateSpies } = makeSut()
        validateSpies[1].error = new MissingParamError(field)

        const error = sut.validate({ [field]: faker.random.word() })

        expect(error).toEqual(validateSpies[1].error)
    })

    test('should return the first error if more than one validation fails', () => {
        const { sut, validateSpies } = makeSut()
        validateSpies[0].error = new Error()
        validateSpies[1].error = new MissingParamError(field)

        const error = sut.validate({ [field]: faker.random.word() })

        expect(error).toEqual(validateSpies[0].error)
    })
})