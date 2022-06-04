import { verifyToken } from "../../user/tools/validadeUser";
import { Note } from "../schema";

export const updateNote = async (token, bookID, noteID, newNote) => {
  const user: any = verifyToken(token);

  if (!user) {
    return
  }

  const note = await Note.findOne({ bookID: bookID, _id: noteID })
  if (!note || note.text === newNote) {
      return false
  } 

  await Note.findOneAndUpdate({ bookID: bookID, _id: noteID }, { text: newNote })
  return true
}