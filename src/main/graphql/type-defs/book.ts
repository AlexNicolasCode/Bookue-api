import { gql } from "apollo-server-express";

export default gql`
    type Mutation {
        addBook (title: String!, author: String!, description: String!, currentPage: String!, pages: String!, userId: String!): Book!
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