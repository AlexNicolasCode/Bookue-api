import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from "@/data/protocols";

import faker from "@faker-js/faker";

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    email: string
    result = false

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        this.email = email
        return this.result
    }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
    params: AddAccountRepository.Params
    result = true

    async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        this.params = params
        return this.result
    }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
    email: string
    result = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        password: faker.internet.password(),
    }

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        this.email
        return this.result
    }
}