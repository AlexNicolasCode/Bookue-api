import { model, Schema } from "mongoose";

const BookSchema = new Schema({
    title: String,
    author: String,
    description: String,
})

export const Book = model("books", BookSchema);