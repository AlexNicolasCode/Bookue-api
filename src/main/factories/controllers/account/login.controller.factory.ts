import { LoginController } from "@/presentation/controllers"
import { Controller } from "@/presentation/protocols"
import { makeDbAuthentication } from "@/main/factories/usecases"
import { makeLoginValidation } from "@/main/factories/validators"

export const makeLoginController = (): Controller => {
    const controller = new LoginController(makeLoginValidation(), makeDbAuthentication())
    return controller
}