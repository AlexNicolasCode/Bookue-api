import { AddAccountRepository } from "@/data/protocols";
import { MongoHelper } from "@/infra";
import { serverError } from "@/presentation/helpers";

import env from "@/env";

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

describe('AccountMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL);
    })

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('user')
    })
})