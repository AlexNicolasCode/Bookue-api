import { AddAccount, Authentication } from "@/domain/usecases"
import { EmailAlreadyUsed } from "@/presentation/errors"
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers"
import { Controller, HttpResponse, Validation } from "@/presentation/protocols"

export class SignUpController implements Controller {
    constructor (
        private readonly addAccount: AddAccount,
        private readonly validation: Validation,
        private readonly authentication: Authentication,
    ) {}

    async handle (request: SignUpController.Request): Promise<HttpResponse> {
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
            return serverError()
        }
    }
}

export namespace SignUpController {
    export type Request = {
        name: string
        email: string
        password: string
        passwordConfirmation: string
    }
}