import { gql } from "apollo-server";

export const typeDefs = gql`
  type UserType {
    name: String,
    email: String,
  }

  type BookType {
    id: String
    title: String
    author: String
    description: String
    currentPage: String
    pages: String
    created_by: String
    created_at: String
  }

  type TokenType {
    token: String
  }

  type Mutation {
    signUpUser(name: String, email: String, password: String): TokenType
    addBook(title: String, author: String, description: String, currentPage: String, pages: String): BookType
    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String, newCurrentPage: String, newPages: String): BookType
    deleteBook(id: String): BookType
    addNote(bookID: String, note: String): Boolean
    deleteNote(bookID: String, noteID: String): Boolean
  }

  type Query {
    getAllBooks: [BookType]
    getBook(id: String): BookType
    loginUser(email: String, password: String): TokenType
    autoLogin: UserType
  }
`;
