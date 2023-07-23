import { AuthMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";
import { makeDbLoadAccountByToken } from "../usecases";

export const makeAuthMiddleware = (): Middleware => {
    return new AuthMiddleware(makeDbLoadAccountByToken())
}