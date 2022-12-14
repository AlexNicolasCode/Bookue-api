import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

import { faker } from "@faker-js/faker";

export class CompareFieldsValidation implements Validation {
    constructor (
      private readonly fieldName: string,
      private readonly fieldToCompareName: string
    ) {}
  
    validate (input: any): Error {
      if (input[this.fieldName] !== input[this.fieldToCompareName]) {
        return new InvalidParamError(this.fieldToCompareName)
      }
    }
}

const field = faker.random.word()
const fieldToCompare = faker.random.word()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'any_field',
      [fieldToCompare]: 'other_field'
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const value = faker.random.word()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})