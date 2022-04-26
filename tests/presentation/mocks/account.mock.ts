import { AddAccount, Authentication, UpdateBook } from "@/domain/usecases";
import faker from "@faker-js/faker";

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
  
    async update (params: UpdateBook.Params): Promise<void> {
      this.params = params
    }
}