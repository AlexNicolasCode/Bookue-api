import { AccessDeniedError } from "@/presentation/errors";
import { serverError } from "@/presentation/helpers";
import { mockAccount } from "tests/domain/mocks";
import { throwError } from "tests/domain/mocks/test.helpers";
import { LoadAccountByTokenSpy } from "../mocks";
import { AuthMiddleware } from "@/presentation/middlewares";

import { faker } from "@faker-js/faker";

const mockRequest = () => ({
    accessToken: faker.datatype.uuid()
})

describe('AuthMiddleware', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should return 500 if LoadAccountById throws', async () => {
        const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
        const sut = new AuthMiddleware(loadAccountByTokenSpy)
        jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(500)
        expect(httpResponse.body).toStrictEqual(serverError().body)
    })

    test('should return 200 on success', async () => {
        const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
        const sut = new AuthMiddleware(loadAccountByTokenSpy)
        const fakeAccount = mockAccount()
        jest.spyOn(loadAccountByTokenSpy, 'load').mockResolvedValueOnce({ id: fakeAccount._id, ...fakeAccount })

        const httpResponse = await sut.handle(mockRequest())

        expect(httpResponse.statusCode).toStrictEqual(200)
        expect(httpResponse.body).toStrictEqual({ id: fakeAccount._id })
    })

    test('should call LoadAccountByToken with correct values', async () => {
        const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
        const sut = new AuthMiddleware(loadAccountByTokenSpy)
        const fakeRequest = mockRequest()

        await sut.handle(fakeRequest)

        expect(loadAccountByTokenSpy.accessToken).toStrictEqual(fakeRequest.accessToken)
    })

    test('should return 403 if access token is invalid', async () => {
        const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
        const sut = new AuthMiddleware(loadAccountByTokenSpy)

        const httpResponse = await sut.handle({ accessToken: null })

        expect(httpResponse.statusCode).toStrictEqual(403)
        expect(httpResponse.body).toStrictEqual(new AccessDeniedError())
    })
})