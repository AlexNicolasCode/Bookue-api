import { SignUpController } from "@/presentation/controllers"
import { makeDbAddAccount } from "../usecases"
import { makeDbAuthentication } from "../usecases"
import { makeSignUpValidation } from "./signup.validation.factory"

export const makeSignUpController = (): SignUpController => {
    const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
    return controller
}