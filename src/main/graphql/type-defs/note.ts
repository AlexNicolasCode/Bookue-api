import { gql } from "apollo-server-express"

export default gql`
    type Query {
        loadNotes (accessToken: String!, bookId: String!): [Notes]
    }

    type Mutation {
        addNote (
            accessToken: String!,
            text: String!,
            bookId: String!,
        ): Boolean
        deleteNote (
            accessToken: String!,
            noteId: String!,
            bookId: String!,
        ): Boolean
    }

    type Notes {
        id: String
        text: String
        createdAt: String
    }
`