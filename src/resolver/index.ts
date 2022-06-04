import { addBook } from "../book/resolvers/addBook";
import { deleteBook } from "../book/resolvers/deleteBook";
import { getAllBooks } from "../book/resolvers/getAllBooks";
import { getBook } from "../book/resolvers/getBook";
import { updateBook } from "../book/resolvers/updateBook";
import { loginUser } from "../user/resolvers/loginResolver";
import { signUpUser } from "../user/resolvers/signUpResolver";
import { autoLogin } from "../user/resolvers/autoLoginResolver";
import { addNote } from "../note/resolvers/addNote";
import { deleteNote } from "../note/resolvers/deleteNote";
import { getNotes } from "../note/resolvers/getNotes";
import { updateNote } from "../note/resolvers/updateNote";

export const resolvers = {
  Query: {
    getAllBooks: (_, __, { token }) => getAllBooks(token),
    getBook: (_, { id }, { token }) => getBook(id, token),
    getNotes: (_, { bookID }, { token }) => getNotes(token, bookID),
    loginUser: (_, { email, password }) => loginUser(email, password),
    autoLogin: (_, __, { token }) => autoLogin(token)
  },

  Mutation: {
    signUpUser: (_, { name, email, password }) => signUpUser(name, email, password),
    addBook: (_, { title, author, description, currentPage, pages }, { token }) => addBook(token, title, author, description, currentPage, pages),
    updateBook: (_, { id, newTitle, newAuthor, newDescription, newCurrentPage, newPages }, { token }) => updateBook(token, id, newTitle, newAuthor, newDescription, newCurrentPage, newPages),
    deleteBook: (_, { id }, { token }) => deleteBook(token, id),
    addNote: (_, { bookID, note }, { token }) => addNote(token, bookID, note),
    deleteNote: (_, { bookID, noteID }, { token }) => deleteNote(token, bookID, noteID),
    updateNote: (_, { bookID, noteID, newNote }, { token }) => updateNote(token, bookID, noteID, newNote)
  }  
}
