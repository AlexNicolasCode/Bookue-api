import bcrypt from "bcrypt"

import { BcryptAdapter } from "@/infra"

import { throwError } from "tests/domain/mocks/test.helpers"

type SutTypes = {
    sut: BcryptAdapter,
    salt: number
}

const makeSut = (): SutTypes => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    return {
        sut,
        salt
    }
}

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return 'hash'
    },

    async compare (): Promise<boolean> {
        return true
    }
}))

describe('BcryptAdapter', () => {
    describe('hash method', () => {
        test('should call hash with correct values', async () => {
            const { sut, salt } = makeSut()
            const hashSpy = jest.spyOn(bcrypt, 'hash')
            
            await sut.hash('any_value')
        
            expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
        })
        
        test('should return a valid hash on hash success', async () => {
            const { sut } = makeSut()
               
            const hash = await sut.hash('any_value')
        
            expect(hash).toBe('hash')
        })
        
        test('should throw if hash throws', async () => {
            const { sut } = makeSut()
            jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
               
            const promise = sut.hash('any_value')
        
            expect(promise).rejects.toThrowError()
        })
    })

    describe('compare method', () => {
        test('should call compare with correct values', async () => {
            const { sut } = makeSut()
            const compareSpy = jest.spyOn(bcrypt, 'compare')
            
            await sut.compare('any_value', 'any_hash')
        
            expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
        })

        test('should throw if compare throws', async () => {
            const { sut } = makeSut()
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
            
            const promise = sut.compare('any_value', 'any_hash')
            
            expect(promise).rejects.toThrowError()
        })
        
        test('should return false when compare fails', async () => {
            const { sut } = makeSut()
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
            
            const result = await sut.compare('any_value', 'any_hash')
        
            expect(result).toBe(false)
        })
        
        test('should return true when compare succeeds', async () => {
            const { sut } = makeSut()
            
            const result = await sut.compare('any_value', 'any_hash')
        
            expect(result).toBe(true)
        })
    })
})