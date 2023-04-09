import { faker } from "@faker-js/faker"

import { badRequest, ok, serverError } from "@/presentation/helpers"
import { throwError } from "tests/domain/mocks/test.helpers"
import { AddBookSpy, LoadAccountByTokenSpy, ValidationSpy } from "../../mocks"
import { AddBookController } from "@/presentation/controllers"

import MockDate from 'mockdate'

const mockRequest = (): AddBookController.Request => ({
    title: faker.datatype.string(),
    author: faker.datatype.string(),
    description: faker.datatype.string(),
    currentPage: faker.datatype.number(),
    pages: faker.datatype.number(),
    accessToken: faker.datatype.string(),    
})

type SutType = {
    sut: AddBookController
    addBook: AddBookSpy
    validation: ValidationSpy
    loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutType => {
    const validation = new ValidationSpy()
    const addBook = new AddBookSpy()
    const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
    const sut = new AddBookController(validation, addBook, loadAccountByTokenSpy)
    return {
        sut,
        addBook,
        validation,
        loadAccountByTokenSpy,
    }
}

describe('AddBookController', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('should call Validation with correct values', async () => {
        const { sut, validation } = makeSut()
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(validation.input).toStrictEqual(request)
    })
    
    test('should return 400 if Validation fails', async () => {
        const { sut, validation } = makeSut()
        validation.error = new Error()
        const request = mockRequest()

        const httpResponse = await sut.handle(request)

        expect(httpResponse).toEqual(badRequest(validation.error))
    })
    
    test('should call AddBook with correct values', async () => {
        const { sut, addBook, loadAccountByTokenSpy } = makeSut()
        const request = mockRequest()

        await sut.handle(request)

        expect(addBook.params).toEqual({
            ...request,
            createdAt: new Date(),
            userId: loadAccountByTokenSpy.result.id,
        })
    })
    
    test('should return 500 if AddBook fails', async () => {
        const { sut, addBook } = makeSut()
        jest.spyOn(addBook, 'add').mockImplementationOnce(throwError)
        const request = mockRequest()

        const httpResponse = await sut.handle(request)

        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('should call LoadAccountByToken with correct values', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        const request = mockRequest()
        
        await sut.handle(request)
        
        expect(loadAccountByTokenSpy.accessToken).toStrictEqual(request.accessToken)
    })
    
    test('should return book data on success', async () => {
        const { sut, loadAccountByTokenSpy } = makeSut()
        const request = mockRequest()

        const httpResponse = await sut.handle(request)

        expect(httpResponse).toEqual(ok({
            ...request,
            createdAt: new Date(),
            userId: loadAccountByTokenSpy.result.id,
        }))
    })
})