import { model, Schema } from "mongoose";

const NoteSchema = new Schema({
    bookID: String,
    text: String,
    created_at: Date
})

export const Note = model("notes", NoteSchema);