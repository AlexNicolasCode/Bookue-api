import { model, Schema } from "mongoose";

const BookSchema = new Schema({
    title: String,
    author: String,
    description: String,
    currentPage: String,
    pages: String,
    userId: String,
    created_at: Date
})

export const Book = model("books", BookSchema);
