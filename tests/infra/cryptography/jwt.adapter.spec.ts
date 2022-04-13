
import { Encrypter } from "@/data/protocols";

import * as jwt from "jsonwebtoken";

class JwtAdapter implements Encrypter {
    constructor (private readonly secret: string) {}

    async encrypt (plaintext: string): Promise<string> {
        return jwt.sign({ id: plaintext }, this.secret)
    }
}

describe('JwtAdapter', () => {
    test('should call sign with correct values', async () => {
        const sut = new JwtAdapter('secret')
        const signSpy = jest.spyOn(jwt, 'sign')
        
        await sut.encrypt('any_id')

        expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })
})