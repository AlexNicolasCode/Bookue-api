import { gql } from "apollo-server-express"

export default gql`
    type Query {
        loadNotes (bookId: String!): [Notes]
    }

    type Mutation {
        addNote (
            text: String!,
            bookId: String!,
        ): AddNoteResult
        deleteNote (
            noteId: String!,
            bookId: String!,
        ): Boolean
        updateNote (
            noteId: String!,
            bookId: String!,
            text: String!,
        ): Boolean
    }

    type AddNoteResult {
        id: String
    }

    type Notes {
        id: String
        text: String
        createdAt: String
    }
`