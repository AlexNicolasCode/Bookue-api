import { LoadBookList } from "@/domain/usecases";
import { serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { LoadBookListSpy } from "../mocks";
import { throwError } from "tests/domain/mocks/test.helpers";

import faker from "@faker-js/faker";

class LoadBookListController implements Controller {
    constructor (private readonly loadBookList: LoadBookList) {}

    async handle (request: LoadBookListController.Request): Promise<HttpResponse> {
        try {
            await this.loadBookList.load(request.userId)
            return
        } catch (error) {
            return serverError(error)
        }
    }
}

namespace LoadBookListController {
    export type Request = {
        userId: string
    }
}

type SutType = {
    sut: LoadBookListController
    loadBookListSpy: LoadBookListSpy
}

const makeSut = (): SutType => {
    const loadBookListSpy = new LoadBookListSpy()
    const sut = new LoadBookListController(loadBookListSpy)
    return {
        sut,
        loadBookListSpy,
    }
}

describe('LoadBookListController', () => {
    test('should return 500 if LoadBookList throws', async () => {
        const { sut, loadBookListSpy } = makeSut()
        const fakeUserId = faker.datatype.uuid()
        jest.spyOn(loadBookListSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({ userId: fakeUserId })

        expect(httpResponse.statusCode).toStrictEqual(500)
    })

    test('should return error on body if LoadBookList throws', async () => {
        const { sut, loadBookListSpy } = makeSut()
        const fakeUserId = faker.datatype.uuid()
        jest.spyOn(loadBookListSpy, 'load').mockImplementationOnce(throwError)

        const httpResponse = await sut.handle({ userId: fakeUserId })

        expect(httpResponse.body).toStrictEqual(serverError(new Error).body)
    })
})