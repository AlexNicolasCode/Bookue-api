import { Book } from "../../book/schema/book"

export const updateNotes = async (id, notes) => {
   await Book.findOneAndUpdate({ _id: id }, notes);
}