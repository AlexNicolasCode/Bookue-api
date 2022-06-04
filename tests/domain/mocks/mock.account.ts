import { UserModel } from "@/domain/models"
import { AddAccount, Authentication } from "@/domain/usecases"

import faker from "@faker-js/faker"

export const mockAccount = (): UserModel => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    accessToken: faker.datatype.uuid(),
})

export const mockAddAccountParams = (): AddAccount.Params => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
})

export const mockAuthenticationParams = (): Authentication.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
})