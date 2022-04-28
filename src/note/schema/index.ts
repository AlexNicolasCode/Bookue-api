import { model, Schema } from "mongoose"

const NoteSchema = new Schema({
    bookID: string,
    text: string,
    created_at: Date
})

export const Note = model("notes", NoteSchema)