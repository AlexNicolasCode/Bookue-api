import { model, Schema } from "mongoose"

const NoteSchema = new Schema({
    bookId: string,
    text: string,
    createdAt: Date
})

export const Note = model("notes", NoteSchema)