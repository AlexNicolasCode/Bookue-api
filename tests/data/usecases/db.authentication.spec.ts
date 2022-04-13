import { LoadAccountByEmailRepository } from "@/data/protocols";
import { Authentication } from "@/domain/usecases";
import { mockAuthenticationParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadAccountByEmailRepositorySpy } from "../mocks";

class DbAuthentication implements Authentication {
    constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

    async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
        await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
        return
    }
}

type SutTypes = {
    sut: DbAuthentication
    loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy() 
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
    return { 
        sut,
        loadAccountByEmailRepositorySpy,
    }
}

describe('DbAuthentication', () => {
    test('should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()

        await sut.auth(authenticationParams)

        expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
    })

    test('should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)

        const promise = sut.auth(authenticationParams)

        expect(promise).rejects.toThrowError()
    })
})