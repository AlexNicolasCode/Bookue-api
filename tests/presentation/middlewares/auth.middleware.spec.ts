import { LoadAccountByToken } from "@/domain/usecases";
import { serverError } from "@/presentation/helpers";
import { HttpResponse, Middleware } from "@/presentation/protocols";
import faker from "@faker-js/faker";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadAccountByTokenSpy } from "../mocks";

export class AuthMiddleware implements Middleware {
    constructor (
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly role?: string,
    ) {}

    async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
        try {
            const { accessToken } = request
            if (accessToken) {
                const account = await this.loadAccountByToken.load(accessToken, this.role)  
                if (account) {
                    return
                }
            }
        } catch (error) {
            return serverError(error)
        }
    }
} 

export namespace AuthMiddleware {
    export type Request = {
        accessToken?: string
    }
}

const mockRequest = () => ({
    accessToken: faker.datatype.uuid()
})

describe('AuthMiddleware', () => {
    test('should return 500 if LoadAccountById throws', async () => {
        const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
        const sut = new AuthMiddleware(loadAccountByTokenSpy)
        jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(500)
        expect(httpResponse.body).toStrictEqual(serverError(new Error).body)
    })
})