import { verifyToken } from "../../user/tools/validadeUser"
import { Note } from "../schema"

export const updateNote = async (token, bookId, noteID, newNote) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const note = await Note.findOne({ bookId: bookId, _id: noteID })
  if (!note || note.text === newNote) {
      return false
  } 

  await Note.findOneAndUpdate({ bookId: bookId, _id: noteID }, { text: newNote })
  return true
}