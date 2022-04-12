import { gql } from "apollo-server-express";

export default gql`
    extends type Mutation {
        addBook: [Book!]!
    }

    type Book {
        id: String
        title: String
        author: String
        description: String
        currentPage: String
        pages: String
        created_at: String
    }
`