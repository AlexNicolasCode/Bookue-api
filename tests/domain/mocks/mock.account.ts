import { AddAccount } from "@/domain/usecases";

import faker from "@faker-js/faker";

export const mockAddAccountParams = (): AddAccount.Params => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
})