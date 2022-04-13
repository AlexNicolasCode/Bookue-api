import { LoadAccountByEmailRepository } from "@/data/protocols";
import { Authentication } from "@/domain/usecases";
import { mockAuthenticationParams } from "tests/domain/mocks";
import { LoadAccountByEmailRepositorySpy } from "../mocks";

class DbAuthentication implements Authentication {
    constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

    async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
        await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
        return
    }
}

describe('DbAuthentication', () => {
    test('should call LoadAccountByEmailRepository with correct email', async () => {
        const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy() 
        const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
        const authenticationParams = mockAuthenticationParams()

        await sut.auth(authenticationParams)

        expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
    })
})