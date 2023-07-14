import mongoose from "mongoose"
import { MongoMemoryServer } from 'mongodb-memory-server'
import { faker } from "@faker-js/faker"

import { AccountMongoRepository, User } from "@/infra"
import { mockAddAccountParams, mockAccount } from "tests/domain/mocks"
import { UserModel } from "@/domain/models"

const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
    let mongoDb: MongoMemoryServer;
    let fakeRequest: Partial<UserModel>

    beforeAll(async () => {
        mongoDb = await MongoMemoryServer.create();
        await mongoose.connect(mongoDb.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoDb.stop()
    })

    beforeEach(async () => {
        fakeRequest = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            accessToken: faker.datatype.uuid(),
        } 
        await User.deleteMany({})
    })

    describe('add()', () => {
        test('should add one only user', async () => {
            const sut = makeSut()
            const fakeAccount = mockAddAccountParams()
            
            await sut.add(fakeAccount)

            const count = await User.countDocuments({ email: fakeAccount.email })
            expect(count).toBe(1)
        })
    })

    describe('checkByEmail()', () => {
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
    })
    
    describe('loadByEmail()', () => {
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
    })
    
    describe('updateAccessToken()', () => {
        test('should call updateAccessToken to update token on success', async () => {
            const sut = makeSut()
            const accountMock = mockAddAccountParams()
            const fakeToken = faker.datatype.uuid()
            await User.create(accountMock)

            const account = await User.findOne({ email: accountMock.email })
            expect(account.accessToken).toBeUndefined()
            await sut.updateAccessToken(account.id, fakeToken)

            const accountAfterUpdateAccessToken = await User.findOne({ email: accountMock.email })
            expect(accountAfterUpdateAccessToken.accessToken).toBe(fakeToken)
        })
    })

    describe('checkByAccessToken()', () => {
        test('should return true when account exists', async () => {
            const sut = makeSut()
            const fakeAccount = mockAccount()
            fakeAccount._id = undefined
            await User.create(fakeAccount)
            
            const result = await sut.checkByAccessToken(fakeAccount.accessToken)

            expect(result).toBe(true)
        })

        test('should return false when account not exists', async () => {
            const sut = makeSut()
            
            const result = await sut.checkByAccessToken(fakeRequest.accessToken)

            expect(result).toBe(false)
        })
    })

    describe('loadByToken()', () => {
        test('should return account id if access token is valid', async () => {
            const sut = makeSut()
            const fakeCreatedAcount = await User.create(mockAddAccountParams())
            
            const result = await sut.loadByToken(fakeCreatedAcount.accessToken)

            expect(result).toStrictEqual({ id: fakeCreatedAcount.id })
        })

        test('should return undefined if User model on findOne method not found account', async () => {
            const sut = makeSut()
            const fakeAccount = mockAccount()
            
            const result = await sut.loadByToken(fakeAccount.accessToken)

            expect(result).toBeUndefined()
        })
    })
})