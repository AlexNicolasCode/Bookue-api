import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const getBook = async (id, token) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const book = await Book.findOne({ _id: id, created_by: user.email});
  return book
}