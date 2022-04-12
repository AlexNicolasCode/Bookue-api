import { CheckAccountByEmailRepository } from "@/data/protocols";
import { AddAccount } from "@/domain/usecases";
import { mockAddAccountParams } from "tests/domain/mocks";
import { CheckAccountByEmailRepositorySpy } from "../mocks";

class DbAddAccount implements AddAccount {
    constructor (
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
    ) {}

    async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
        const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email) 
        return true
    }
}

describe('DbAddAccount', () => {
    test('should pass correct param to checkAccountByEmailRepository', async () => {
        const checkAccountByEmailRepository = new CheckAccountByEmailRepositorySpy()
        const addAccountParams = mockAddAccountParams()
        const sut = new DbAddAccount(checkAccountByEmailRepository)

        await sut.add(addAccountParams)

        expect(addAccountParams.email).toBe(checkAccountByEmailRepository.email)
    })
})