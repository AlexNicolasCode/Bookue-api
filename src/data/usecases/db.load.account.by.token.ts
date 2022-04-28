import { LoadAccountByToken } from "@/domain/usecases/load.account.by.token"
import { Decrypter, LoadAccountByTokenRepository } from "../protocols"

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor (
        private readonly decrypter: Decrypter,
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
    ) {}

    async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
        let token: string
        try {
            token = await this.decrypter.decrypt(accessToken)
            if (token) {
                const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
                return account ?? null
            }
        } catch (error) {
            return null
        }
    }
}