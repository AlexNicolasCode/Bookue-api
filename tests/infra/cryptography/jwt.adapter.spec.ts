
import { throwError } from "tests/domain/mocks/test.helpers"

import jwt from "jsonwebtoken"
import { JwtAdapter } from "@/infra/cryptography"

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return 'any_token'
    },

    async verify (): Promise<string> {
        return 'any_value'
    },
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

    test('should call verify with correct values', async () => {
        const sut = makeSut()
        const verifySpy = jest.spyOn(jwt, 'verify')
        
        await sut.decrypt('any_token')

        expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })

    test('should return string on success', async () => {
        const sut = makeSut()
        
        const result = await sut.decrypt('any_value')

        expect(result).toBe('any_value')
    })
})