import { Validation } from "@/presentation/protocols"
import { PageCountValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators"

export const makeUpdateNoteValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['accessToken', 'noteId', 'bookId', 'text']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new PageCountValidation())
    return new ValidationComposite(validations)
}