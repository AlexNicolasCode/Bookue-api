import { 
    AddAccountRepository, 
    CheckAccountByEmailRepository, 
    CheckAccountByAccessTokenRepository, 
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository,
} from "@/data/protocols"
import { MongoHelper } from "./mongo.helper"
import { User } from "./mongoose.schemas"

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, CheckAccountByAccessTokenRepository, LoadAccountByTokenRepository {
    async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        await User.create(account)
        return true
    }

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        const hasAccount = await User.findOne({ email: email })
        return hasAccount ? true : false
    }
    

    async checkByAccessToken (accessToken: string): Promise<CheckAccountByAccessTokenRepository.Result> {
        const hasAccount = await User.findOne({ accessToken: accessToken })
        return hasAccount ? true : false
    }
    
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const account = await User.findOne({ email: email })
        return {
            id: account.id,
            name: account.name,
            email: account.email,
            password: account.password,
        }
    }

    async updateAccessToken (id: string, token: string): Promise<void> {
        await MongoHelper.updateAccessToken(id, token)
    }

    async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
        const account = await User.findOne({ accessToken: accessToken })
        return account
    }
}
