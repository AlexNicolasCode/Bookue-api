import { adaptResolver } from "@/main/adapters";
import { makeAddBookController } from "@/main/factories/controllers";

export default {
    Mutation: {
        addBook: async (parent: any, args: any, context: any) => adaptResolver(makeAddBookController(), args, context)
    }
}