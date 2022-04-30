import { Validation } from "@/presentation/protocols"
import { PageCountValidation, RequiredFieldValidation, ValidationComposite } from "@/validation/validators"

export const makeAddBookValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['title', 'author', 'pages', 'accessToken']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new PageCountValidation())
    return new ValidationComposite(validations)
}