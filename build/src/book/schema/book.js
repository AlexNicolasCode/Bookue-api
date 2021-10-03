"use strict";
exports.__esModule = true;
exports.Book = void 0;
var mongoose_1 = require("mongoose");
var BookSchema = new mongoose_1.Schema({
    title: String,
    author: String,
    description: String,
    notes: Array,
    createdBy: String
});
exports.Book = (0, mongoose_1.model)("books", BookSchema);
