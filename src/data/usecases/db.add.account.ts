import { AddAccount } from "@/domain/usecases"
import { AddAccountRepository, CheckAccountByEmailRepository, Hasher } from "../protocols"

export class DbAddAccount implements AddAccount {
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