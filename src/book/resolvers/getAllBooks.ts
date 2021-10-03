import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const getAllBooks = async (token) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const book = await Book.find({ createdBy: user.email });
  return book
}