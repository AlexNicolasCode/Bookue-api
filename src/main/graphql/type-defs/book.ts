import { gql } from "apollo-server-express";

export default gql`
    type Query {
        loadAllBooks (userId: String!): [Book]
        loadOneBook (userId: String!, bookId: String!): Book
    }

    type Mutation {
        addBook (title: String!, author: String!, description: String, currentPage: String, pages: String!, userId: String!): Book!
        updateBook (
            title: String, 
            author: String, 
            description: String, 
            currentPage: String, 
            pages: String, 
            userId: String, 
            bookId: String
        ): Boolean
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