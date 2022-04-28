import { verifyToken } from "../../user/tools/validadeUser"
import { Book } from "../schema/book"

export const getAllBooks = async (token) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const book = await Book.find({ created_by: user.email }).sort([['created_at', -1]])
  return book.filter((book) => book.created_by === user.email)
}