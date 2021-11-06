import { Book } from "../../book/schema/book";
import { verifyToken } from "../../user/tools/validadeUser";
import { findBook } from "../tools/findBook";

export const addNote = async (token, bookID, note) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }

    const book = await findBook(bookID, user.email);
    if (book.notes.find((e) => e.text === note)) {
        return
    }
    
    const newNotes = {
        notes: [
            ...book.notes,
            {
                text: note,
                created_at: Date.now()
            }
        ],
    }
    await Book.findOneAndUpdate({ _id: bookID }, newNotes);

    const updatedBook = await Book.findOne({ _id: bookID, createdBy: user.email });
    return await updatedBook.notes.find((e) => e.text === note);
}