import { AccountMongoRepository, User } from "@/infra"
import { mockAddAccountParams, mockAccount } from "tests/domain/mocks"
import env from "@/env"

import faker from "@faker-js/faker"
import * as mongoose from 'mongoose'

const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
    beforeAll(async () => {
        await mongoose.connect(env.MONGO_URL)
    })

    beforeEach(async () => {
        await User.deleteMany({})
        jest.resetAllMocks()
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
        const fakeToken = faker.datatype.uuid()
        await User.create(accountMock)

        const account = await User.findOne({ email: accountMock.email })
        expect(account.accessToken).toBeFalsy()
        await sut.updateAccessToken(account.id, fakeToken)

        const accountAfterUpdateAccessToken = await User.findOne({ email: accountMock.email })
        expect(accountAfterUpdateAccessToken.accessToken).toBe(fakeToken)
    })

    test('should return true when account exists', async () => {
        const sut = makeSut()
        const fakeAccount = mockAccount()
        jest.spyOn(User, 'findOne').mockResolvedValueOnce(fakeAccount)
        
        const result = await sut.checkByAccessToken(fakeAccount.id)

        expect(result).toBe(true)
    })

    test('should return false when account exists', async () => {
        const sut = makeSut()
        const fakeAccount = mockAccount()
        jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined)
        
        const result = await sut.checkByAccessToken(fakeAccount.id)

        expect(result).toBe(false)
    })

    test('should return account id if access token is valid', async () => {
        const sut = makeSut()
        const fakeAccount = mockAccount()
        jest.spyOn(User, 'findOne').mockResolvedValueOnce(fakeAccount)
        
        const result = await sut.loadByToken(fakeAccount.accessToken)

        expect(result).toStrictEqual(fakeAccount)
    })

    test('should return undefined if User model on findOne method not found account', async () => {
        const sut = makeSut()
        const fakeAccount = mockAccount()
        jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined)
        
        const result = await sut.loadByToken(fakeAccount.accessToken)

        expect(result).toBeUndefined()
    })
})