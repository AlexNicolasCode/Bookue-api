import { Validation } from "@/presentation/protocols";
import { RequiredFieldValidation, ValidationComposite } from "@/validation/validators";

export const makeAddBookValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['title', 'author', 'pages', 'userId']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}