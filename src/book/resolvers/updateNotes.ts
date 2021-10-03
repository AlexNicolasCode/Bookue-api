import { verifyToken } from "../../user/tools/validadeUser";
import { Book } from "../schema/book";

export const updateNotes = async (token, id, newTitle, newAuthor, newDescription, newNotes) => {
  const user = verifyToken(token)

  if (!user) {
    return
  }

  const currentNotes = await Book.findOne({ _id: id, createdBy: user.email });

  const bookProps = {
    title: newTitle,
    author: newAuthor,
    description: newDescription,
    notes: [
      ...currentNotes.notes,
      newNotes
    ],
    createdBy: user.email
  }

  await Book.findOneAndUpdate({ _id: id }, bookProps);
  const updateNotes = await Book.findOne({ _id: id, createdBy: user.email });

  return updateNotes
}