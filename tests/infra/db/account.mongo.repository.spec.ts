import { AccountMongoRepository, MongoHelper } from "@/infra";
import { mockAddAccountParams } from "tests/domain/mocks";

import env from "@/env";

describe('AccountMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL);
    })

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('user')
    })

    test('should add one only user', async () => {
        const sut = new AccountMongoRepository();
        const accountData = mockAddAccountParams();
        
        await sut.add(accountData);
        const count = await MongoHelper.countDocuments('user', accountData);
        
        expect(count).toBe(1)
    })
})