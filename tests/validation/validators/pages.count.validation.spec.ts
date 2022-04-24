import { InvalidPageCountError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";


class PageCountValidation implements Validation {
    constructor () {}

    validate (input: any): Error {
        if (input.pages < input.currentPage) {
            return new InvalidPageCountError()
        }
    }
}

describe('PageCountValidation', () => {
    test('should return undefined if pages is more than or or equal currentPage', async () => {
        const sut = new PageCountValidation()
        
        const result = sut.validate({ pages: 100, currentPage: 10 })

        expect(result).toBeUndefined()
    })

    test('should return InvalidPageCountError if currentPage is more than pages', async () => {
        const sut = new PageCountValidation()
        
        const result = sut.validate({ pages: 10, currentPage: 100 })

        expect(result).toStrictEqual(new InvalidPageCountError())
    })
})