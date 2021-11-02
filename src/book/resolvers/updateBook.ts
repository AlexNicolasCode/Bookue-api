import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const updateBook = async (token, id, newTitle, newAuthor, newDescription, newCurrentPage, newPages) => {
  const user: any = verifyToken(token)

  if (!user) {
    return
  }

  const bookProps = {
    title: newTitle,
    author: newAuthor,
    description: newDescription,
    currentPage: newCurrentPage,
    pages: newPages,
    notes: [],
  }

  await Book.findOneAndUpdate({ _id: id }, bookProps);
  const updatedBook = await Book.findOne({ _id: id, createdBy: user.email });

  return updatedBook
}
