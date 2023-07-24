import { gql } from "apollo-server-express"

export default gql`
    type Query {
        loadAllBooks: [Book]
        loadOneBook (bookId: String!): Book
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
            bookId: String
        ): Boolean
        deleteBook (bookId: String!): Boolean
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