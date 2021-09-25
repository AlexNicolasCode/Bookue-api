import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    id: String
    title: String
    author: String
    description: String
  }

  type Mutation {
    addBook(title: String, author: String, description: String): Book
    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String): Book
    deleteBook(id: String): Book
  }

  type Query {
    books: [Book]
    getBook(id: String): Book
  }
`;