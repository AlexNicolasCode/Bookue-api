import { adaptResolver } from "@/main/adapters"
import { makeAddNoteController } from "@/main/factories/controllers"

export default {
    Mutation: {
        addNote: async (parent: any, args: any, context: any) => adaptResolver(makeAddNoteController(), args, context),
    }
}