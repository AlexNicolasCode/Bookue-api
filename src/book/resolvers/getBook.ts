import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const getBook = async (id, token) => {
  const user = verifyToken(token)
  console.log(user.email)

  if (!user) {
    return
  }

  const book = await Book.findOne({ _id: id, createdBy: user.email});
  return book
}