import { Decrypter, LoadAccountByTokenRepository } from "@/data/protocols";
import { LoadAccountByToken } from "@/domain/usecases";
import faker from "@faker-js/faker";
import { mockUserModel } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from "../mocks";

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
    ) {}

    async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
        let token: string
        try {
            token = await this.decrypter.decrypt(accessToken)
            if (token) {
                const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
                return account ?? null
            }
        } catch (error) {
            return null
        }
    }
}

type SutType = {
    decrypterSpy: DecrypterSpy
    loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
    sut: DbLoadAccountByToken
}

const makeSut = (): SutType => {
    const decrypterSpy = new DecrypterSpy()
    const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
    const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
    return {
        sut,
        decrypterSpy,
        loadAccountByTokenRepositorySpy,
    }
}

describe('DbLoadAccountByToken', () => {
    test('should return null if Decrypt throws', async () => {
        const { sut, decrypterSpy } = makeSut()
        const fakeAccessToken = faker.internet.password()
        jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)

        const result = await sut.load(fakeAccessToken)

        expect(result).toBeNull()
    })
    
    test('should call Decrypt with corrent token', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeAccessToken = faker.internet.password()

        await sut.load(fakeAccessToken)

        expect(loadAccountByTokenRepositorySpy.token).toBe(fakeAccessToken)
    })

    test('should call LoadAccountByTokenRepository with correct token and role', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeAccessToken = faker.internet.password()

        await sut.load(fakeAccessToken, 'any_role')

        expect(loadAccountByTokenRepositorySpy.role).toBe('any_role')
        expect(loadAccountByTokenRepositorySpy.token).toBe(fakeAccessToken)
    })

    test('should return null if LoadAccountByTokenRepository throws', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeAccessToken = faker.internet.password()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)

        const result = await sut.load(fakeAccessToken)

        expect(result).toBeNull()
    })

    test('should return null if LoadAccountByTokenRepository not found account', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeAccessToken = faker.internet.password()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockResolvedValueOnce(undefined)

        const result = await sut.load(fakeAccessToken)

        expect(result).toBeNull()
    })

    test('should return account data if LoadAccountByTokenRepository found an account', async () => {
        const { sut, loadAccountByTokenRepositorySpy } = makeSut()
        const fakeAccessToken = faker.internet.password()
        const fakeAccount = mockUserModel()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockResolvedValueOnce(fakeAccount)

        const result = await sut.load(fakeAccessToken)

        expect(result).toBe(fakeAccount)
    })
})