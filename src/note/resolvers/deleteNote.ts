import { verifyToken } from "../../user/tools/validadeUser";
import { updateNotes } from "../tools/updateNotes";
import { findBook } from "../tools/findBook";
import { Book } from "../../book/schema/book";

export const deleteNote = async (token, bookID, noteID) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const book = await findBook(bookID, user.email);
  const newNotes = await setNewNotes(book, noteID);
  updateNotes(bookID, { notes: newNotes })

  return isDeleted(bookID, newNotes)
}

const setNewNotes = (book, noteID) => { 
  return book.notes.filter((note) => String(note._id) !== noteID)
}

const isDeleted = async (id, currentNote) => {
  const book = await Book.findOne({ _id: id })
  const notes = book.notes;
  return notes.length - 1 === currentNote.length && notes.filter((note) => note.text === currentNote)[0] === undefined
}