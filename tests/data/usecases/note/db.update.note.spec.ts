import { LoadAccountByTokenRepository } from "@/data/protocols";
import { UpdateNote } from "@/domain/usecases";
import { LoadAccountByTokenRepositorySpy } from "tests/data/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

import faker from "@faker-js/faker";

class DbUpdateNote implements UpdateNote {
    constructor (
        private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
    ) {}

    async update (data: UpdateNote.Params): Promise<void> {
        const account = await this.loadAccountByTokenRepository.loadByToken(data.accessToken)
        if (account) {}
    }
}

describe('DbUpdateNote', () => {
    let fakeRequest: UpdateNote.Params

    beforeEach(async () => {
        jest.resetAllMocks()
        fakeRequest = {
            accessToken: faker.datatype.uuid(),
            noteId: faker.datatype.uuid(),
            bookId: faker.datatype.uuid(),
            text: faker.random.words(),
        }
    })

    test('should throw if LoadAccountByTokenRepository throws', async () => {
        const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
        const sut = new DbUpdateNote(loadAccountByTokenRepositorySpy)
        jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)

        const promise = sut.update(fakeRequest)

        await expect(promise).rejects.toThrowError()
    })    

    test('should call LoadAccountByTokenRepository with correct parameters', async () => {
        const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
        const sut = new DbUpdateNote(loadAccountByTokenRepositorySpy)

        await sut.update(fakeRequest)

        expect(loadAccountByTokenRepositorySpy.token).toBe(fakeRequest.accessToken)
    })    
})