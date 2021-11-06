import { verifyToken } from "../../user/tools/validadeUser";
import { findBook } from "../tools/findBook";
import { updateNotes } from "../tools/updateNotes";

export const updateNote = async (token, bookID, noteID, newNote) => {
  const user: any = verifyToken(token);

  if (!user) {
    return
  }

  
  const book = await findBook(bookID, user.email);
  if (isNodeAlreadyExist(book.notes, newNote)) {
      return
  }

  const newNotes = getNewNotes(book.notes, noteID, newNote);
  await updateNotes(bookID, newNotes)
  
  return await isUpdated(bookID, user.email, newNotes)
}

const isUpdated = async (bookID, email, newNotes) => {
    const book = await findBook(bookID, email);
    return book.notes.length === newNotes.length
}

const isNodeAlreadyExist = async (allNotes, newNote) => {
    return allNotes.map((note) => note.text === newNote)[0] === undefined ? true : false 
}

const getNewNotes = async (notes, noteID, newNote) => {
    return notes.map((note) => {
        if (String(note._id) === noteID) {
            return {
                text: newNote,
                created_at: note.created_at
            }
        }

        return note
    })
}

