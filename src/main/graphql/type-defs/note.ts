import { gql } from "apollo-server-express"

export default gql`
    type Mutation {
        addNote (
            accessToken: String!,
            text: String!,
            bookId: String!,
        ): Boolean
    }

    type Book {
        created_at: String
        userId: String
    }
`