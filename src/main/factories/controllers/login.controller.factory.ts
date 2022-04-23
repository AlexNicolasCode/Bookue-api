import { LoginController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeDbAuthentication } from "../usecases/authentication.factory";
import { makeLoginValidation } from "./login.validation.factory";

export const makeLoginController = (): Controller => {
    const controller = new LoginController(makeLoginValidation(), makeDbAuthentication())
    return controller
}