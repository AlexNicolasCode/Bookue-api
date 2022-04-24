import { adaptResolver } from "@/main/adapters";
import { makeAddBookController, makeLoadBookListController } from "@/main/factories/controllers";

export default {
    Query: {
        loadAllBooks: async (parent: any, args: any) => adaptResolver(makeLoadBookListController(), args)
    },

    Mutation: {
        addBook: async (parent: any, args: any, context: any) => adaptResolver(makeAddBookController(), args, context)
    }
}