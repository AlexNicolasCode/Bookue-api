import { Authentication } from "@/domain/usecases"
import { Encrypter, HashComparer, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from "../protocols"

export class DbAuthentication implements Authentication {
    constructor (
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
        private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    ) {}

    async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
        if (account) {
            const isValidPassword = await this.hashComparer.compare(authenticationParams.password, account.password)
            if (isValidPassword) {
                const accessToken = await this.encrypter.encrypt(account.id)
                await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
                return {
                    accessToken,
                    name: account.name
                }
            }
        }
        return null
    }
}