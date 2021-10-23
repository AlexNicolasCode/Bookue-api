import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    name: String,
    email: String,
  }

  type Book {
    id: String
    title: String
    author: String
    description: String
    createdBy: String
  }

  type Token {
    token: String
  }

  type Mutation {
    signUpUser(name: String, email: String, password: String): Token
    addBook(title: String, author: String, description: String): Book
    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String): Book
    updateNotes(id: String, newTitle: String, newAuthor: String, newDescription: String, newNotes: String): Book
    deleteBook(id: String): Book
  }

  type Query {
    getAllBooks: [Book]
    getBook(id: String): Book
    loginUser(name: String, email: String, password: String): Token
    autoLogin: User
  }
`;