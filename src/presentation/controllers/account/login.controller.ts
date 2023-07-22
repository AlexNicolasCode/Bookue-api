import { Authentication } from "@/domain/usecases"
import { badRequest, unauthorized, ok, serverError } from "@/presentation/helpers"
import { Controller, Validation, HttpResponse } from "@/presentation/protocols"

export class LoginController implements Controller {
    constructor (
        private readonly validation: Validation,
        private readonly authentication: Authentication,
    ) {}

    async handle (request: LoginController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) {
                return badRequest(error)
            }
            const authenticationModel = await this.authentication.auth(request)
            if (!authenticationModel) {
                return unauthorized()
            }
            return ok(authenticationModel)
        } catch (error) {
            return serverError()
        }
    }
}

export namespace LoginController {
    export type Request = {
        email: string
        password: string
    }
}