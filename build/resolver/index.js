"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
var addBook_1 = require("../book/resolvers/addBook");
var deleteBook_1 = require("../book/resolvers/deleteBook");
var getAllBooks_1 = require("../book/resolvers/getAllBooks");
var getBook_1 = require("../book/resolvers/getBook");
var updateBook_1 = require("../book/resolvers/updateBook");
var loginResolver_1 = require("../user/resolvers/loginResolver");
var signUpResolver_1 = require("../user/resolvers/signUpResolver");
var autoLoginResolver_1 = require("../user/resolvers/autoLoginResolver");
exports.resolvers = {
    Query: {
        getAllBooks: function (_, __, _a) {
            var token = _a.token;
            return (0, getAllBooks_1.getAllBooks)(token);
        },
        getBook: function (_, _a, _b) {
            var id = _a.id;
            var token = _b.token;
            return (0, getBook_1.getBook)(id, token);
        },
        loginUser: function (_, _a) {
            var name = _a.name, email = _a.email, password = _a.password;
            return (0, loginResolver_1.loginUser)(name, email, password);
        },
        autoLogin: function (_, __, _a) {
            var token = _a.token;
            return (0, autoLoginResolver_1.autoLogin)(token);
        }
    },
    Mutation: {
        signUpUser: function (_, _a) {
            var name = _a.name, email = _a.email, password = _a.password;
            return (0, signUpResolver_1.signUpUser)(name, email, password);
        },
        addBook: function (_, _a, _b) {
            var title = _a.title, author = _a.author, description = _a.description, currentPage = _a.currentPage, pages = _a.pages;
            var token = _b.token;
            return (0, addBook_1.addBook)(token, title, author, description, currentPage, pages);
        },
        updateBook: function (_, _a, _b) {
            var id = _a.id, newTitle = _a.newTitle, newAuthor = _a.newAuthor, newDescription = _a.newDescription, currentPage = _a.currentPage, pages = _a.pages;
            var token = _b.token;
            return (0, updateBook_1.updateBook)(token, id, newTitle, newAuthor, newDescription, currentPage, pages);
        },
        deleteBook: function (_, _a, _b) {
            var id = _a.id;
            var token = _b.token;
            return (0, deleteBook_1.deleteBook)(token, id);
        }
    }
};
