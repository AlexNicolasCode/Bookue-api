"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.typeDefs = void 0;
var apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type UserType {\n    name: String,\n    email: String,\n  }\n\n  type BookType {\n    id: String\n    title: String\n    author: String\n    description: String\n    currentPage: String\n    pages: String\n    notes: [NoteType]\n    created_by: String\n    created_at: String\n  }\n\n  type TokenType {\n    token: String\n  }\n\n  type NoteType {\n    bookID: String\n    id: String\n    text: String\n  }\n\n  type Mutation {\n    signUpUser(name: String, email: String, password: String): TokenType\n    addBook(title: String, author: String, description: String, currentPage: String, pages: String): BookType\n    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String, newCurrentPage: String, newPages: String): BookType\n    deleteBook(id: String): BookType\n    addNote(bookID: String, note: String): NoteType\n    deleteNote(bookID: String, noteID: String): NoteType\n    updateNote(bookID: String, noteID: String, newNote: String): Boolean\n  }\n\n  type Query {\n    getAllBooks: [BookType]\n    getBook(id: String): BookType\n    loginUser(email: String, password: String): TokenType\n    autoLogin: UserType\n    getNotes(bookID: String): [NoteType]\n  }\n"], ["\n  type UserType {\n    name: String,\n    email: String,\n  }\n\n  type BookType {\n    id: String\n    title: String\n    author: String\n    description: String\n    currentPage: String\n    pages: String\n    notes: [NoteType]\n    created_by: String\n    created_at: String\n  }\n\n  type TokenType {\n    token: String\n  }\n\n  type NoteType {\n    bookID: String\n    id: String\n    text: String\n  }\n\n  type Mutation {\n    signUpUser(name: String, email: String, password: String): TokenType\n    addBook(title: String, author: String, description: String, currentPage: String, pages: String): BookType\n    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String, newCurrentPage: String, newPages: String): BookType\n    deleteBook(id: String): BookType\n    addNote(bookID: String, note: String): NoteType\n    deleteNote(bookID: String, noteID: String): NoteType\n    updateNote(bookID: String, noteID: String, newNote: String): Boolean\n  }\n\n  type Query {\n    getAllBooks: [BookType]\n    getBook(id: String): BookType\n    loginUser(email: String, password: String): TokenType\n    autoLogin: UserType\n    getNotes(bookID: String): [NoteType]\n  }\n"])));
var templateObject_1;
