import { MissingParamError } from "@/presentation/errors";
import { RequiredFieldValidation } from "@/validation/validators";

import faker from "@faker-js/faker";

const field = faker.random.word();

describe('RequiredFieldValidation', () => {
    test('should return a MissingParamError when a field is missing', () => {
        const sut = new RequiredFieldValidation(field);

        const error = sut.validate({ invalidField: faker.random.word() })

        expect(error).toEqual(new MissingParamError(field))
    })
})