import { UnauthorizedError } from "../errors"
import { HttpResponse } from "../protocols"

export const badRequest = (error: Error): HttpResponse  => ({
    statusCode: 400,
    body: error
})

export const serverError = (): HttpResponse  => ({
    statusCode: 500,
    body: null
})

export const noContent = (): HttpResponse  => ({
    statusCode: 204,
    body: null
})

export const notFound = (): HttpResponse  => ({
    statusCode: 404,
    body: null
})

export const forbidden = (error: any): HttpResponse => ({
    statusCode: 403,
    body: error
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
})