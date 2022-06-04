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
    notes: [NoteType]
    created_by: String
    created_at: String
  }

  type TokenType {
    token: String
  }

  type NoteType {
    bookID: String
    id: String
    text: String
  }

  type Mutation {
    signUpUser(name: String, email: String, password: String): TokenType
    addBook(title: String, author: String, description: String, currentPage: String, pages: String): BookType
    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String, newCurrentPage: String, newPages: String): BookType
    deleteBook(id: String): BookType
    addNote(bookID: String, note: String): NoteType
    deleteNote(bookID: String, noteID: String): NoteType
    updateNote(bookID: String, noteID: String, newNote: String): Boolean
  }

  type Query {
    getAllBooks: [BookType]
    getBook(id: String): BookType
    loginUser(email: String, password: String): TokenType
    autoLogin: UserType
    getNotes(bookID: String): [NoteType]
  }
`;
