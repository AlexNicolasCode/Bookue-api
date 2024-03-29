import { SignUpController } from "@/presentation/controllers"
import { makeDbAddAccount } from "@/main/factories/usecases"
import { makeDbAuthentication } from "@/main/factories/usecases"
import { makeSignUpValidation } from "@/main/factories/validators"

export const makeSignUpController = (): SignUpController => {
    return new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
}