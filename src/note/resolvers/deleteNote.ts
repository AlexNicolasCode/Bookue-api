import { verifyToken } from "../../user/tools/validadeUser"
import { Note } from "../schema"

export const deleteNote = async (token, bookId, noteID) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const note = await Note.findOneAndDelete({ bookId: bookId, _id: noteID})
  if (!note) {
    return false
  }

  return note
}