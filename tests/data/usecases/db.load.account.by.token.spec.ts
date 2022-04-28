import { Decrypter } from "@/data/protocols";
import { LoadAccountByToken } from "@/domain/usecases";
import faker from "@faker-js/faker";
import { throwError } from "tests/domain/mocks/test.helpers";
import { DecrypterSpy } from "../mocks";

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter
    ) {}

    async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
        try {
            await this.decrypter.decrypt(accessToken)
        } catch (error) {
            return null
        }
        return
    }
}

describe('DbLoadAccountByToken', () => {
    test('should return null if decrypt throws', async () => {
        const decrypterSpy = new DecrypterSpy()
        const sut = new DbLoadAccountByToken(decrypterSpy)
        const fakeAccessToken = faker.internet.password()
        jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)

        const result = await sut.load(fakeAccessToken)

        expect(result).toBeNull()
    })
})