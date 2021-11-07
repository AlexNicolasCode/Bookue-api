"use strict";
exports.__esModule = true;
exports.Note = void 0;
var mongoose_1 = require("mongoose");
var NoteSchema = new mongoose_1.Schema({
    bookID: String,
    text: String,
    created_at: Date
});
exports.Note = (0, mongoose_1.model)("notes", NoteSchema);
