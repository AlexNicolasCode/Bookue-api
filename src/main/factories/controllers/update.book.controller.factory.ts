import { UpdateBookController } from "@/presentation/controllers";
import { makeDbUpdateBook } from "../usecases";
import { makeSignUpValidation } from "./signup.validation.factory";

export const makeUpdateBookController = (): UpdateBookController => {
    const controller = new UpdateBookController(makeSignUpValidation(), makeDbUpdateBook())
    return controller
}