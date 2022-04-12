import { ServerError } from "../errors";
import { HttpReponse } from "../protocols";

export const badRequest = (error: Error): HttpReponse  => ({
    statusCode: 400,
    body: error
})

export const serverError = (error: Error): HttpReponse  => ({
    statusCode: 500,
    body: new ServerError(error.stack)
})

export const noContent = (): HttpReponse  => ({
    statusCode: 204,
    body: null
})

export const ok = (data: any): HttpReponse => ({
    statusCode: 200,
    body: data
})