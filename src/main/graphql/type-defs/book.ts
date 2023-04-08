import { gql } from "apollo-server-express"

export default gql`
    type Query {
        loadAllBooks (accessToken: String!): [Book]
        loadOneBook (accessToken: String!, bookId: String!): Book
    }

    type Mutation {
        addBook (
            title: String!,
            author: String,
            description: String,
            currentPage: Int,
            pages: Int!
        ): Book!
        updateBook (
            title: String,
            author: String,
            description: String,
            currentPage: String,
            pages: String,
            accessToken: String,
            bookId: String
        ): Boolean
        deleteBook (accessToken: String!, bookId: String!): Boolean
    }

    type Book {
        id: String
        title: String
        author: String
        description: String
        currentPage: String
        pages: String
        createdAt: String
        userId: String
    }
`