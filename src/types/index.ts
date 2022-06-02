import { gql } from "apollo-server"

export const typeDefs = gql`
  type UserType {
    name: string,
    email: string,
  }

  type BookType {
    id: string
    title: string
    author: string
    description: string
    currentPage: string
    pages: string
    notes: [NoteType]
    created_by: string
    created_at: string
  }

  type TokenType {
    token: string
  }

  type NoteType {
    bookId: string
    id: string
    text: string
  }

  type Mutation {
    signUpUser(name: string, email: string, password: string): TokenType
    addBook(title: string, author: string, description: string, currentPage: string, pages: string): BookType
    updateBook(id: string, newTitle: string, newAuthor: string, newDescription: string, newCurrentPage: string, newPages: string): BookType
    deleteBook(id: string): BookType
    addNote(bookId: string, note: string): NoteType
    deleteNote(bookId: string, noteID: string): NoteType
    updateNote(bookId: string, noteID: string, newNote: string): Boolean
  }

  type Query {
    getAllBooks: [BookType]
    getBook(id: string): BookType
    loginUser(email: string, password: string): TokenType
    autoLogin: UserType
    getNotes(bookId: string): [NoteType]
  }
`
