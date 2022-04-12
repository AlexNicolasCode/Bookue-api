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

    test('should return true when found an account with checkByEmail', async () => {
        const sut = new AccountMongoRepository();
        const accountData = mockAddAccountParams();

        await sut.add(accountData);        
        const hasAccount = await sut.checkByEmail(accountData.email);
        
        expect(hasAccount).toBe(true)
    })

    test('should return false when account not exists', async () => {
        const sut = new AccountMongoRepository();
        const accountData = mockAddAccountParams();

        const hasAccount = await sut.checkByEmail(accountData.email);
        
        expect(hasAccount).toBe(false)
    })
})