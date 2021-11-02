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
    currentPage: String
    pages: String
    created_by: String
    created_at: String
  }

  type Token {
    token: String
  }

  type Mutation {
    signUpUser(name: String, email: String, password: String): Token
    addBook(title: String, author: String, description: String, currentPage: String, pages: String): Book
    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String, newCurrentPage: String, newPages: String): Book
    updateNotes(id: String, newTitle: String, newAuthor: String, newDescription: String, newNotes: String, currentPage: String, pages: String): Book
    deleteBook(id: String): Book
  }

  type Query {
    getAllBooks: [Book]
    getBook(id: String): Book
    loginUser(email: String, password: String): Token
    autoLogin: User
  }
`;
