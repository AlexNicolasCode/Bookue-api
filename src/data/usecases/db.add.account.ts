import { AddAccount } from "@/domain/usecases"
import { AddAccountRepository, CheckAccountByEmailRepository, Hasher } from "../protocols"

export class DbAddAccount implements AddAccount {
    constructor (
        private readonly hasher: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
    ) {}
        
    async add (account: AddAccount.Params): Promise<AddAccount.Result> {
        const hasAccount = await this.checkAccountByEmailRepository.checkByEmail(account.email) 
        if (!hasAccount) {
            const hashedPassword = await this.hasher.hash(account.password)
            const isAdded = await this.addAccountRepository.add({ ...account, password: hashedPassword })
            return isAdded
        }
    }
}