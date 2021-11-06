import { Book } from "../../book/schema/book"

export const updateNotes = async (id, note) => {
   await Book.findOneAndUpdate({ _id: id }, note);
}