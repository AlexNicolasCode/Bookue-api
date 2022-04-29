import { AuthMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";
import { makeDbLoadAccountByToken } from "../usecases/load.account.by.token.factory";

export const makeAuthMiddleware = (role?: string): Middleware => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}