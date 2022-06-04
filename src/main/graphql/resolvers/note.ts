import { adaptResolver } from "@/main/adapters"
import { 
    makeAddNoteController, 
    makeDeleteNoteController,
    makeLoadNotesController,
} from "@/main/factories/controllers"

export default {
    Query: {
        loadNotes: async (parent: any, args: any, context: any) => adaptResolver(makeLoadNotesController(), args, context),
    },

    Mutation: {
        addNote: async (parent: any, args: any, context: any) => adaptResolver(makeAddNoteController(), args, context),
        deleteNote: async (parent: any, args: any, context: any) => adaptResolver(makeDeleteNoteController(), args, context),
    },
}