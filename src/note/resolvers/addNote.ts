import { verifyToken } from "../../user/tools/validadeUser";
import { findBook } from "../tools/findBook";
import { updateNotes } from "../tools/updateNotes";

export const addNote = async (token, bookID, note) => {
  const user: any = await verifyToken(token)

  if (!user) {
    return
  }

  const book = await findBook(bookID, user.email);
  if (book && book.notes[0] && isValidNote(book.notes, note)) {
    const newNotes = await setNewNotes(book.notes, note);
    await updateNotes(bookID, newNotes)
    return await isAdded(bookID, user.email, newNotes)
  }

  await updateNotes(bookID, { notes: [{ text: note }] })
  return true
} 

const isAdded = async (bookID, email, newNotes) => {
    const book = await findBook(bookID, email)
    return book.notes.length === newNotes.notes.length
}

const isValidNote = (notes, newNotes) => {
    return notes.find((note) => note.text === newNotes) ? false : true
}

const setNewNotes = (currentNotes, note) => {
    return {
        notes: [
            ...currentNotes,
            { text: note }
        ],
      }      
}