import { addBook } from "../book/resolvers/addBook";
import { deleteBook } from "../book/resolvers/deleteBook";
import { getAllBooks } from "../book/resolvers/getAllBooks";
import { getBook } from "../book/resolvers/getBook";
import { updateBook } from "../book/resolvers/updateBook";
import { updateNotes } from "../book/resolvers/updateNotes";
import { loginUser } from "../user/resolvers/loginResolver";
import { signUpUser } from "../user/resolvers/signUpResolver";
import { autoLogin } from "../user/resolvers/autoLoginResolver";

export const resolvers = {
  Query: {
    getAllBooks: (_, __, { token }) => getAllBooks(token),
    getBook: (_, { id }, { token }) => getBook(id, token),
    loginUser: (_, { name, email, password }) => loginUser(name, email, password),
    autoLogin: (_, __, { token }) => autoLogin(token)
  },

  Mutation: {
    signUpUser: (_, { name, email, password }) => signUpUser(name, email, password),
    addBook: (_, { title, author, description }, { token }) => addBook(token, title, author, description),
    updateBook: (_, { id, newTitle, newAuthor, newDescription }, { token }) => updateBook(token, id, newTitle, newAuthor, newDescription),
    updateNotes: (_, { id, newTitle, newAuthor, newDescription, newNotes }, { token }) => updateNotes(token, id, newTitle, newAuthor, newDescription, newNotes),
    deleteBook: (_, { id }, { token }) => deleteBook(token, id)
  }  
}