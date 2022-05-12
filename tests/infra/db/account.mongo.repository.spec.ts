import { AccountMongoRepository, MongoHelper, User } from "@/infra"
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
        const fakeAccount = mockAddAccountParams()
        
        await sut.add(fakeAccount)

        const count = await User.countDocuments({ email: fakeAccount.email })
        expect(count).toBe(1)
    })

    test('should return true when account exists', async () => {
        const sut = makeSut()
        const fakeAccount = mockAddAccountParams()
        await User.create(fakeAccount)      
          
        const result = await sut.checkByEmail(fakeAccount.email)
        
        expect(result).toBe(true)
    })
    
    test('should return false when account not exists', async () => {
        const sut = makeSut()
        const fakeAccount = mockAddAccountParams()
        
        const result = await sut.checkByEmail(fakeAccount.email)
        
        expect(result).toBe(false)
    })
    
    test('should return data account on success', async () => {
        const sut = makeSut()
        const fakeAccount = mockAddAccountParams()
        await User.create(fakeAccount)

        const result = await sut.loadByEmail(fakeAccount.email)
        
        expect({
            name: result.name,
            email: result.email,
            password: result.password,
        }).toStrictEqual(fakeAccount)
    })
    
    test('should call updateAccessToken to update token on success', async () => {
        const sut = makeSut()
        const accountMock = mockAddAccountParams()
        const token = faker.datatype.uuid()
        await User.create(accountMock)

        const account = await MongoHelper.findUserByEmail(accountMock.email)
        expect(account.accessToken).toBeFalsy()
        await sut.updateAccessToken(account.id, token)        
        const accountAfterUpdateAccessToken = await MongoHelper.findUserByEmail(accountMock.email)
        
        expect(accountAfterUpdateAccessToken.accessToken).toBe(token)
    })

    test('should return true when account exists', async () => {
        const sut = makeSut()
        const fakeAccount = mockUserModel()
        jest.spyOn(User, 'findOne').mockResolvedValueOnce(fakeAccount)
        
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

    test('should return account id if access token is valid', async () => {
        const sut = makeSut()
        const fakeAccount = mockUserModel()
        jest.spyOn(User, 'findOne').mockResolvedValueOnce(fakeAccount)
        
        const result = await sut.loadByToken(fakeAccount.accessToken)

        expect(result).toStrictEqual(fakeAccount)
    })

    test('should return undefined if User model on findOne method not found account', async () => {
        const sut = makeSut()
        const fakeAccount = mockUserModel()
        jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined)
        
        const result = await sut.loadByToken(fakeAccount.accessToken)

        expect(result).toBeUndefined()
    })
})