import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const addBook = async (token, title, author, description, currentPages, pages) => {
  const user: any = await verifyToken(token)

  if (!user) {
    return
  }

  const bookProps = {
    title: title,
    author: author,
    description: description,
    currentPages: currentPages,
    pages: pages,
    notes: [],
    createdBy: user.email
  }      

  const book = await Book.findOne(bookProps);

  if (!book) {
    return Book.create(bookProps);
  }
}
