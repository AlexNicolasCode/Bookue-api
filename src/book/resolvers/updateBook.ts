import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const updateBook = async (token, id, newTitle, newAuthor, newDescription) => {
  const user = verifyToken(token)

  if (!user) {
    return
  }

  const bookProps = {
    title: newTitle,
    author: newAuthor,
    description: newDescription,
    notes: [],
    createdBy: user.email
  }

  await Book.findOneAndUpdate({ _id: id }, bookProps);
  const updatedBook = await Book.findOne({ _id: id, createdBy: user.email });

  return updatedBook
}