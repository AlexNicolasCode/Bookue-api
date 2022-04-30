import { SignUpController } from "@/presentation/controllers"
import { makeDbAddAccount } from "@/main/factories/usecases"
import { makeDbAuthentication } from "@/main/factories/usecases"
import { makeSignUpValidation } from "./signup.validation.factory"

export const makeSignUpController = (): SignUpController => {
    const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
    return controller
}