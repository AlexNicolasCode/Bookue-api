import { verifyToken } from "../../user/tools/validadeUser";
import { findBook } from "../tools/findBook";
import { updateNotes } from "../tools/updateNotes";

export const addNote = async (token, bookID, note) => {
  const user: any = await verifyToken(token)

  if (!user) {
    return
  }

  const book = await findBook(bookID, user.email);
  if (isValidNote(book.notes, note) !== undefined) {
      return false
  }

  const newNotes = await setNewNotes(book.notes, note);
  await updateNotes(bookID, newNotes)

  return isAdded(book, newNotes)
} 

const isAdded = (book, newNotes) => {
    return book.notes.length === newNotes.notes.length - 1
}

const isValidNote = (notes, newNotes) => {
    return notes.find((note) => note.text === newNotes)
}

const setNewNotes = (currentNotes, note) => {
    return {
        notes: [
            ...currentNotes,
            {
                text: note,
                created_at: Date.now()
            }
        ],
      }      
}