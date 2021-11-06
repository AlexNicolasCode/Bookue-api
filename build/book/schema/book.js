"use strict";
exports.__esModule = true;
exports.Book = void 0;
var mongoose_1 = require("mongoose");
var NoteSchema = new mongoose_1.Schema({
    text: String,
    created_at: Date
});
var BookSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    description: String,
    currentPage: String,
    pages: String,
    notes: [NoteSchema],
    created_by: String,
    created_at: Date
});
exports.Book = (0, mongoose_1.model)("books", BookSchema);
