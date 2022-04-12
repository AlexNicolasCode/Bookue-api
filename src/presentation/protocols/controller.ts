import { HttpReponse } from "./http";

export interface Controller<T = any> {
    handle: (request: T) => Promise<HttpReponse>
}