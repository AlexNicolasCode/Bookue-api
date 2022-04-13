
import { Encrypter } from "@/data/protocols";
import { throwError } from "tests/domain/mocks/test.helpers";

import * as jwt from "jsonwebtoken";

class JwtAdapter implements Encrypter {
    constructor (private readonly secret: string) {}

    async encrypt (plaintext: string): Promise<string> {
        return jwt.sign({ id: plaintext }, this.secret)
    }
}

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return 'any_token'
    }
}))


const makeSut = (): JwtAdapter => {
    return new JwtAdapter('secret')
}

describe('JwtAdapter', () => {
    test('should call sign with correct values', async () => {
        const sut = makeSut()
        const signSpy = jest.spyOn(jwt, 'sign')
        
        await sut.encrypt('any_id')

        expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('should return token on success', async () => {
        const sut = makeSut()
        
        const accessToken = await sut.encrypt('any_id')

        expect(accessToken).toBe('any_token')
    })

    test('should throw if sign throws', async () => {
        const sut = makeSut()
        jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
        
        const promise = sut.encrypt('any_id')

        expect(promise).rejects.toThrowError()
    })
})