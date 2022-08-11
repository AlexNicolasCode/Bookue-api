import { mockAccount } from "tests/domain/mocks"
import { throwError } from "tests/domain/mocks/test.helpers"
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from "../../mocks"
import { DbLoadAccountByToken } from "@/data/usecases"

import { faker } from "@faker-js/faker"

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
        const { sut, decrypterSpy } = makeSut()
        const fakeAccessToken = faker.internet.password()

        await sut.load(fakeAccessToken)

        expect(decrypterSpy.ciphertext).toBe(fakeAccessToken)
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
        const fakeAccount = mockAccount()
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockResolvedValueOnce(fakeAccount)

        const result = await sut.load(fakeAccessToken)

        expect(result).toBe(fakeAccount)
    })
})