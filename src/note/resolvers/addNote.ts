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

  return await isAdded(bookID, user.email, newNotes)
} 

const isAdded = async (bookID, email, newNotes) => {
    const book = await findBook(bookID, email)
    if (book.notes) {
        return false
    }

    return book.notes.length === newNotes.notes.length
}

const isValidNote = (notes, newNotes) => {
    if (!notes) {
        return true
    }

    return notes.find((note) => note.text === newNotes)
}

const setNewNotes = (currentNotes, note) => {
    if (!currentNotes) {
        return {
            notes: [{ text:note, created_at: Date.now() }]
        }
    }

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