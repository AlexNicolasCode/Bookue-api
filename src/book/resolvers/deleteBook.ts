import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const deleteBook = async (token, id) => {
  const user = verifyToken(token)

  if (!user) {
    return
  }

  const book = await Book.findOneAndDelete({ _id: id, createdBy: user.email });
  return book
}