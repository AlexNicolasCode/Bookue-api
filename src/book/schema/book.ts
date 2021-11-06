import { model, Schema } from "mongoose";

const NoteSchema = new Schema({
    text: String,
    created_at: Date
})

const BookSchema = new Schema({
    title: String,
    author: String,
    description: String,
    currentPage: String,
    pages: String,
    notes: [NoteSchema],
    created_by: String,
    created_at: Date
})

export const Book = model("books", BookSchema);
