import { AddAccountRepository, CheckAccountByEmailRepository, Hasher } from "@/data/protocols";
import { AddAccount } from "@/domain/usecases";
import { mockAddAccountParams } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy } from "../mocks";

type SutTypes = {
    sut: DbAddAccount
    hasher: HasherSpy
    addAccountRepository: AddAccountRepositorySpy
    checkAccountByEmailRepository: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const hasher = new HasherSpy()
    const addAccountRepository = new AddAccountRepositorySpy()
    const checkAccountByEmailRepository = new CheckAccountByEmailRepositorySpy()
    const sut = new DbAddAccount(hasher, addAccountRepository, checkAccountByEmailRepository)
    return {
        sut,
        hasher,
        addAccountRepository,
        checkAccountByEmailRepository
    }
} 

class DbAddAccount implements AddAccount {
    constructor (
        private readonly hasher: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
        ) {}
        
        async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
            const hasAccount = await this.checkAccountByEmailRepository.checkByEmail(accountData.email) 
            if (!hasAccount) {
                const hashedPassword = await this.hasher.hash(accountData.password)
                const isAdded = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
                return isAdded
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

    test('should return false if checkAccountByEmailRepository found an account', async () => {
        const { sut, checkAccountByEmailRepository } = makeSut()  
        const addAccountParams = mockAddAccountParams()
        checkAccountByEmailRepository.result = true

        const result = await sut.add(addAccountParams)

        expect(result).toBeFalsy()
    })

    test('should pass correct param to Hasher', async () => {
        const { sut, hasher } = makeSut()  
        const addAccountParams = mockAddAccountParams()

        await sut.add(addAccountParams)

        expect(addAccountParams.password).toBe(hasher.plaintext)
    })

    test('should throw if Hasher throws', async () => {
        const { sut, hasher } = makeSut()  
        const addAccountParams = mockAddAccountParams()
        jest.spyOn(hasher, 'hash').mockImplementationOnce(throwError)

        const promise = sut.add(addAccountParams)

        expect(promise).rejects.toThrowError()
    })

    test('should pass correct param to AddAccountRepository', async () => {
        const { sut, hasher, addAccountRepository } = makeSut()  
        const addAccountParams = mockAddAccountParams()

        await sut.add(addAccountParams)

        expect({ ...addAccountParams, password: hasher.result }).toStrictEqual(addAccountRepository.params)
    })

    test('should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepository } = makeSut()  
        const addAccountParams = mockAddAccountParams()
        jest.spyOn(addAccountRepository, 'add').mockImplementationOnce(throwError)

        const promise = sut.add(addAccountParams)

        expect(promise).rejects.toThrowError()
    })

    test('should return false if AddAccountRepository fails to save account', async () => {
        const { sut, addAccountRepository } = makeSut()  
        const addAccountParams = mockAddAccountParams()
        addAccountRepository.result = false

        const result = await sut.add(addAccountParams)

        expect(result).toBe(false)
    })

    test('should return true on success', async () => {
        const { sut } = makeSut()  
        const addAccountParams = mockAddAccountParams()

        const result = await sut.add(addAccountParams)

        expect(result).toBe(true)
    })
})