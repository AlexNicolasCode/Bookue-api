import { CheckAccountByEmailRepository, Hasher } from "@/data/protocols";
import { AddAccount } from "@/domain/usecases";
import { mockAddAccountParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { CheckAccountByEmailRepositorySpy, HasherSpy } from "../mocks";

type SutTypes = {
    sut: DbAddAccount
    hasher: HasherSpy
    checkAccountByEmailRepository: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const hasher = new HasherSpy()
    const checkAccountByEmailRepository = new CheckAccountByEmailRepositorySpy()
    const sut = new DbAddAccount(hasher, checkAccountByEmailRepository)
    return {
        sut,
        hasher,
        checkAccountByEmailRepository
    }
} 

class DbAddAccount implements AddAccount {
    constructor (
        private readonly hasher: Hasher,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
        ) {}
        
        async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
            const hasAccount = await this.checkAccountByEmailRepository.checkByEmail(accountData.email) 
            if (!hasAccount) {
                await this.hasher.hash(accountData.password)
                return true
            }
        }
    }

describe('DbAddAccount', () => {
    test('should pass correct param to checkAccountByEmailRepository', async () => {
        const { sut, checkAccountByEmailRepository } = makeSut()  
        const addAccountParams = mockAddAccountParams()

        await sut.add(addAccountParams)

        expect(addAccountParams.email).toBe(checkAccountByEmailRepository.email)
    })

    test('should throw if checkAccountByEmailRepository throws', async () => {
        const { sut, checkAccountByEmailRepository } = makeSut()  
        const addAccountParams = mockAddAccountParams()
        jest.spyOn(checkAccountByEmailRepository, 'checkByEmail').mockImplementationOnce(throwError)

        const promise = sut.add(addAccountParams)

        expect(promise).rejects.toThrowError()
    })

    test('should pass correct param to Hasher', async () => {
        const { sut, hasher } = makeSut()  
        const addAccountParams = mockAddAccountParams()

        await sut.add(addAccountParams)

        expect(addAccountParams.password).toBe(hasher.plaintext)
    })
})