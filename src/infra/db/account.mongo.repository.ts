import { 
    AddAccountRepository, 
    CheckAccountByEmailRepository, 
    CheckAccountByAccessTokenRepository, 
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
} from "@/data/protocols"
import { serverError } from "@/presentation/helpers"
import { MongoHelper } from "./mongo.helper"

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, CheckAccountByAccessTokenRepository {
    async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        try {
            const isAdded = await MongoHelper.addOneOn('user', accountData)
            return isAdded
        } catch (e) {
            throw serverError(e)
        }
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
}
