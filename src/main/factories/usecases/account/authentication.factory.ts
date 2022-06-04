import { DbAuthentication } from "@/data/usecases"
import { Authentication } from "@/domain/usecases"
import { AccountMongoRepository, BcryptAdapter } from "@/infra"
import { JwtAdapter } from "@/infra/cryptography"
import env from "@/main/config/env"

export const makeDbAuthentication = (): Authentication => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
} 