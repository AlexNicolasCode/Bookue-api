import { LoadAccountByToken } from "@/domain/usecases"
import { AccessDeniedError } from "../errors"
import { forbidden, ok, serverError } from "../helpers"
import { HttpResponse, Middleware } from "../protocols"

export class AuthMiddleware implements Middleware {
    constructor (
        private readonly loadAccountByToken: LoadAccountByToken,
    ) {}

    async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
        try {
            const { accessToken } = request
            if (accessToken) {
                const account = await this.loadAccountByToken.load(accessToken)  
                if (account) {
                    return ok({ id: account.id })
                }
            }
            return forbidden(new AccessDeniedError())
        } catch (error) {
            return serverError()
        }
    }
} 

export namespace AuthMiddleware {
    export type Request = {
        accessToken?: string
    }
}