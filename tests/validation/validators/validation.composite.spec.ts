import { MissingParamError } from "@/presentation/errors";
import { ValidationSpy } from "tests/presentation/mocks";
import { ValidationComposite } from "@/validation/validators";

import faker from "@faker-js/faker";

const field = faker.random.word()

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

    test('should not return on success', () => {
        const { sut } = makeSut()

        const result = sut.validate({ [field]: faker.random.word() })

        expect(result).toBeUndefined()
    })
})