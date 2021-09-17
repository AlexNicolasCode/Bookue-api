import { Schema } from "mongoose";

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
    description: {
        type: String,
        required: false
    },
})

export const BookSchema = mongoose.model('books', BookSchema)