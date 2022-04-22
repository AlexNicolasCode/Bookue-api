import { BcryptAdapter } from "@/infra";
import { throwError } from "tests/domain/mocks/test.helpers";

import * as bcrypt from 'bcrypt'

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

    })
})