import { verifyToken } from "../../user/tools/validadeUser"
import { Book } from "../schema/book"

export const addBook = async (token, title, author, description, currentPage, pages) => {
  const user: any = await verifyToken(token)

  if (!user) {
    return
  }

  const bookProps = {
    title: title,
    author: author,
    description: description,
    currentPage: currentPage,
    pages: pages,
    created_by: user.email,
    created_at: Date.now()
  }      

  const book = await Book.findOne(bookProps)

  if (!book) {
    return Book.create(bookProps)
  }
}
