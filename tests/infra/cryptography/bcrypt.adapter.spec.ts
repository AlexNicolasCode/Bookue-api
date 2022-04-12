import { Hasher } from "@/data/protocols";

import * as bcrypt from 'bcrypt'

class BcryptAdapter implements Hasher {
    constructor (private readonly salt: number) {}

    async hash (plaintext: string): Promise<string> {
        return bcrypt.hash(plaintext, this.salt)
    }
}

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return 'hash'
    }
}))

describe('BcryptAdapter', () => {
    test('should call hash with correct values', async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        
        await sut.hash('any_value')

        expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })
})