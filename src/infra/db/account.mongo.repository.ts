import { 
    AddAccountRepository, 
    CheckAccountByEmailRepository, 
    CheckAccountByAccessTokenRepository, 
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository,
} from "@/data/protocols"
import { serverError } from "@/presentation/helpers"
import { MongoHelper } from "./mongo.helper"

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, CheckAccountByAccessTokenRepository, LoadAccountByTokenRepository {
    async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        const isAdded = await MongoHelper.addOneOn('user', account)
        return isAdded
    }

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        const hasAccount = await MongoHelper.findUserByEmail(email)
        return hasAccount ? true : false
    }
    

    async checkByAccessToken (accessToken: string): Promise<CheckAccountByAccessTokenRepository.Result> {
        const hasAccount = await MongoHelper.findUserByAccessToken(accessToken)
        return hasAccount ? true : false
    }
    
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        const account = await MongoHelper.findUserByEmail(email)
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

    async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
        const account = await MongoHelper.findUserByAccessToken(token)
        return account
    }
}
