import { AddAccount, Authentication, LoadAccountByToken, UpdateBook } from "@/domain/usecases"
import { mockUserModel } from "tests/domain/mocks"

import faker from "@faker-js/faker"

export class AddAccountSpy implements AddAccount {
    params: AddAccount.Params
    result = true
    
    async add (params: AddAccount.Params): Promise<boolean> {
        this.params = params
        return this.result
    }
}

export class AuthenticationSpy implements Authentication {
    params: Authentication.Params
    result = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName()
    }
  
    async auth (params: Authentication.Params): Promise<Authentication.Result> {
      this.params = params
      return this.result
    }
}

export class UpdateBookSpy implements UpdateBook {
    params: UpdateBook.Params
    result = true
  
    async update (params: UpdateBook.Params): Promise<UpdateBook.Result> {
      this.params = params
      return this.result
    }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
    accessToken: string
    role: string
    result = mockUserModel()
  
    async load (accessToken: string, role?: string ): Promise<LoadAccountByToken.Result> {
      this.accessToken = accessToken
      this.role = role
      return this.result
    }
}