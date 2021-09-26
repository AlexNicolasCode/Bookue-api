"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.typeDefs = void 0;
var apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Book {\n    id: String\n    title: String\n    author: String\n    description: String\n  }\n\n  type Mutation {\n    addBook(title: String, author: String, description: String): Book\n    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String): Book\n    deleteBook(id: String): Book\n  }\n\n  type Query {\n    books: [Book]\n    getBook(id: String): Book\n  }\n"], ["\n  type Book {\n    id: String\n    title: String\n    author: String\n    description: String\n  }\n\n  type Mutation {\n    addBook(title: String, author: String, description: String): Book\n    updateBook(id: String, newTitle: String, newAuthor: String, newDescription: String): Book\n    deleteBook(id: String): Book\n  }\n\n  type Query {\n    books: [Book]\n    getBook(id: String): Book\n  }\n"])));
var templateObject_1;
