import { AddAccountRepository, CheckAccountByEmailRepository, CheckAccountByAccessTokenRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, DeleteBookRepository } from "@/data/protocols"

import faker from "@faker-js/faker"

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
    email: string
    result = false

    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
        this.email = email
        return this.result
    }
}

export class CheckAccountByAccessTokenRepositorySpy implements CheckAccountByAccessTokenRepository {
    accessToken: string
    result = true

    async checkByAccessToken (accessToken: string): Promise<boolean> {
        this.accessToken = accessToken
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
        email: faker.internet.email(),
        password: faker.internet.password(),
    }

    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
        this.email = email
        return this.result
    }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
    token: string
    role: string
    result = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    }

    async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
        this.token = token
        this.role = role
        return this.result
    }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
    id: string
    token: string

    async updateAccessToken (id: string, token: string): Promise<void> {
        this.id = id
        this.token = token
    }
}

export class DeleteBookRepositorySpy implements DeleteBookRepository {
    accessBook: string
    bookId: string

    async delete (data: DeleteBookRepository.Params): Promise<void> {
        this.accessBook = data.accessToken
        this.bookId = data.bookId
    }
}