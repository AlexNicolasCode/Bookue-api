import { AddAccountRepository, CheckAccountByEmailRepository } from "@/data/protocols"
import { serverError } from "@/presentation/helpers"
import { MongoHelper } from "./mongo.helper"

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository {
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
}
