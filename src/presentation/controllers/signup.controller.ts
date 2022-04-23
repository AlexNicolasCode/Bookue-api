import { AddAccount, Authentication } from "@/domain/usecases"
import { EmailAlreadyUsed } from "../errors"
import { badRequest, forbidden, ok, serverError } from "../helpers"
import { Controller, HttpResponse, Validation } from "../protocols"

export class SignUpController implements Controller {
    constructor (
        private readonly addAccount: AddAccount,
        private readonly validation: Validation,
        private readonly authentication: Authentication,
    ) {}

    async handle (request: any): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const { name, email, password } = request
            const isValid = await this.addAccount.add({
                name,
                email,
                password,
            })
            if (!isValid) {
                return forbidden(new EmailAlreadyUsed())
            }
            const authenticationModel = await this.authentication.auth({
                email,
                password,
            })
            return ok(authenticationModel)
        } catch (error) {
            return serverError(error)
        }
    }
}