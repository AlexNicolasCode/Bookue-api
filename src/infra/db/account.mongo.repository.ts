import { AddAccountRepository } from "@/data/protocols"
import { serverError } from "@/presentation/helpers"
import { MongoHelper } from "./mongo.helper"

export class AccountMongoRepository implements AddAccountRepository {
    async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        try {
            const isAdded = await MongoHelper.addOneOn('user', accountData)
            return isAdded
        } catch (e) {
            throw serverError(e)
        }
    }
}
