import { MissingParamError } from "@/presentation/errors";
import { RequiredFieldValidation } from "@/validation/validators";

import faker from "@faker-js/faker";

const field = faker.random.word();

type SutTypes = {
    sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
    const sut = new RequiredFieldValidation(field);
    return { sut }
}

describe('RequiredFieldValidation', () => {
    test('should return a MissingParamError when a field is missing', () => {
        const { sut } = makeSut();
        
        const error = sut.validate({ invalidField: faker.random.word() })
        
        expect(error).toEqual(new MissingParamError(field))
    });
    
    test('should not return on success', () => {
        const { sut } = makeSut();

        const error = sut.validate({ [field]: faker.random.word() })

        expect(error).toBeUndefined()
    });
})