import { AccountMongoRepository, MongoHelper } from "@/infra"
import { mockAddAccountParams, mockUserModel } from "tests/domain/mocks"
import env from "@/env"

import faker from "@faker-js/faker"

const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.MONGO_URL)
    })

    beforeEach(async () => {
        await MongoHelper.deleteManyOn('user')
    })

    test('should add one only user', async () => {
        const sut = makeSut()
        const accountData = mockAddAccountParams()
        
        await sut.add(accountData)
        const count = await MongoHelper.countDocuments('user', accountData)
        
        expect(count).toBe(1)
    })

    test('should return true when account exists', async () => {
        const sut = makeSut()
        const accountData = mockAddAccountParams()

        await sut.add(accountData)        
        const result = await sut.checkByEmail(accountData.email)
        
        expect(result).toBe(true)
    })
    
    test('should return false when account not exists', async () => {
        const sut = makeSut()
        const accountData = mockAddAccountParams()
        
        const result = await sut.checkByEmail(accountData.email)
        
        expect(result).toBe(false)
    })
    
    test('should return data account on success', async () => {
        const sut = makeSut()
        const accountData = mockAddAccountParams()
        
        await sut.add(accountData)
        const result = await sut.loadByEmail(accountData.email)
        
        expect({
            name: result.name,
            email: result.email,
            password: result.password,
        }).toStrictEqual(accountData)
    })
    
    test('should call updateAccessToken to update token on success', async () => {
        const sut = makeSut()
        const accountDataMock = mockAddAccountParams()
        const token = faker.datatype.uuid()
        
        await sut.add(accountDataMock)
        const account = await MongoHelper.findUserByEmail(accountDataMock.email)
        expect(account.accessToken).toBeFalsy()
        await sut.updateAccessToken(account.id, token)        
        const accountAfterUpdateAccessToken = await MongoHelper.findUserByEmail(accountDataMock.email)
        
        expect(accountAfterUpdateAccessToken.accessToken).toBe(token)
    })

    test('should return true when account exists', async () => {
        const sut = makeSut()
        const fakeAccount = mockUserModel()
        jest.spyOn(MongoHelper, 'findUserByAccessToken').mockResolvedValueOnce(fakeAccount)
        
        const result = await sut.checkByAccessToken(fakeAccount.id)

        expect(result).toBe(true)
    })

    test('should return false when account exists', async () => {
        const sut = makeSut()
        const fakeAccount = mockUserModel()
        jest.spyOn(MongoHelper, 'findUserByAccessToken').mockResolvedValueOnce(undefined)
        
        const result = await sut.checkByAccessToken(fakeAccount.id)

        expect(result).toBe(false)
    })
})