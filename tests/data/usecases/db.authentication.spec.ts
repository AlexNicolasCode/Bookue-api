import { Encrypter, HashComparer, LoadAccountByEmailRepository } from "@/data/protocols";
import { Authentication } from "@/domain/usecases";
import { mockAuthenticationParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy } from "../mocks";

class DbAuthentication implements Authentication {
    constructor (
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
    ) {}

    async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
        if (account) {
            const isValidPassword = await this.hashComparer.compare(authenticationParams.password, account.password)
            if (isValidPassword) {
                await this.encrypter.encrypt(account.id)
                return
            }
        }
        return null
    }
}

type SutTypes = {
    sut: DbAuthentication
    loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
    hashComparerSpy: HashComparerSpy
    encrypterSpy: EncrypterSpy
}

const makeSut = (): SutTypes => {
    const hashComparerSpy = new HashComparerSpy()
    const encrypterSpy = new EncrypterSpy()
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy() 
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy)
    return { 
        sut,
        loadAccountByEmailRepositorySpy,
        hashComparerSpy,
        encrypterSpy,
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

    test('should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        loadAccountByEmailRepositorySpy.result = null
        const authenticationParams = mockAuthenticationParams()

        const response = await sut.auth(authenticationParams)

        expect(response).toBeNull()
    })

    test('should call HashComparer with correct email', async () => {
        const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()

        await sut.auth(authenticationParams)

        expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
        expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.result.password)
    })
    
    test('should throw if HashComparer throws', async () => {
        const { sut, hashComparerSpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)

        const promise = sut.auth(authenticationParams)

        expect(promise).rejects.toThrowError()
    })
    
    test('should call Encrypter with correct account id', async () => {
        const { sut, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()

        await sut.auth(authenticationParams)

        expect(loadAccountByEmailRepositorySpy.result.id).toBe(encrypterSpy.plaintext)       
    })
})