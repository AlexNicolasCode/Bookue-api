import { InvalidPageCountError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class PageCountValidation implements Validation {
    constructor () {}

    validate (input: any): Error {
        if (input.pages < input.currentPage) {
            return new InvalidPageCountError()
        }
    }
}
