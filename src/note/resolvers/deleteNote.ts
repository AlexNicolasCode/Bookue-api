import { verifyToken } from "../../user/tools/validadeUser";
import { updateNotes } from "../tools/updateNotes";
import { findBook } from "../tools/findBook";

export const deleteNote = async (token, bookID, noteID) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const book = await findBook(bookID, user.email);
  const newNotes = await setNewNotes(book, noteID);
  updateNotes(bookID, { notes: newNotes })

  return await isDeleted(bookID, user.email, newNotes)
}

const setNewNotes = (book, noteID) => { 
  return book.notes.filter((note) => String(note._id) !== noteID)
}

const isDeleted = async (bookID, email, currentNote) => {
  const book = await findBook(bookID, email)
  const notes = book.notes;
  return notes.length === currentNote.length && notes.filter((note) => note.text === currentNote)[0] === undefined
}