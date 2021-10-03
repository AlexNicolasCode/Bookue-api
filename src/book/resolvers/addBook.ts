import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const addBook = async (token, title, author, description) => {
  const user = await verifyToken(token)

  if (!user) {
    return
  }

  const bookProps = {
    title: title,
    author: author,
    description: description,
    notes: [],
    createdBy: user.email
  }      

  const book = await Book.findOne(bookProps);

  if (!book) {
    return Book.create(bookProps);
  }
}