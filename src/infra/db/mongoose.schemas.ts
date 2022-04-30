import { model, Schema } from "mongoose"

const UserSchema = new Schema({
    name: String, 
    email: String, 
    password: String,
    accessToken: String,
})

export const User = model("bookue-users", UserSchema)

const BookSchema = new Schema({
    title: String,
    author: String,
    description: String,
    currentPage: String,
    pages: String,
    userId: String,
    created_at: Date
})

export const Book = model("books", BookSchema)
