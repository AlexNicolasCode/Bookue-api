import { verifyToken } from "../../user/tools/validadeUser"
import { Note } from "../schema"

export const deleteNote = async (token, bookID, noteID) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const note = await Note.findOneAndDelete({ bookID: bookID, _id: noteID})
  if (!note) {
    return false
  }

  return note
}