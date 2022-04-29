import env from "@/main/config/env";
import { DbLoadAccountByToken } from "@/data/usecases";
import { LoadAccountByToken } from "@/domain/usecases";
import { AccountMongoRepository } from "@/infra";
import { JwtAdapter } from "@/infra/cryptography/jwt.adapter";

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}