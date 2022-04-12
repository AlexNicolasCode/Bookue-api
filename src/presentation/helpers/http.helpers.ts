import { HttpReponse } from "../protocols";

export const badRequest = (error: Error): HttpReponse  => ({
    statusCode: 400,
    body: error
})