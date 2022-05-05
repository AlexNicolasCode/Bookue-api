import { adaptResolver } from "@/main/adapters"
import { makeAddBookController, makeDeleteBookController, makeLoadBookController, makeLoadBooksController, makeUpdateBookController } from "@/main/factories/controllers"

export default {
    Query: {
        loadAllBooks: async (parent: any, args: any) => adaptResolver(makeLoadBooksController(), args),
        loadOneBook: async (parent: any, args: any) => adaptResolver(makeLoadBookController(), args),
    },

    Mutation: {
        addBook: async (parent: any, args: any, context: any) => adaptResolver(makeAddBookController(), args, context),
        updateBook: async (parent: any, args: any, context: any) => adaptResolver(makeUpdateBookController(), args, context),
        deleteBook: async (parent: any, args: any, context: any) => adaptResolver(makeDeleteBookController(), args, context),
    }
}