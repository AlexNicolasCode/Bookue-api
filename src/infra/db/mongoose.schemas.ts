import { model, Schema } from "mongoose"

const UserSchema = new Schema({
    name: String, 
    email: String, 
    password: String,
    accessToken: String,
})

const BookSchema = new Schema({
    title: String,
    author: String,
    description: String,
    currentPage: String,
    pages: String,
    slug: String,
    userId: String,
    createdAt: Date
})

const NoteSchema = new Schema({
    userId: String,
    bookId: String,
    text: String,
    createdAt: Date
})

export const Book = model("books", BookSchema)
export const User = model("bookue-users", UserSchema)
export const Note = model("notes", NoteSchema)
