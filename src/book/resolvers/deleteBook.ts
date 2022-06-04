import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const deleteBook = async (token, id) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const book = await Book.findOneAndDelete({ _id: id, created_by: user.email });
  return book
}