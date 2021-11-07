import { Book } from "../../book/schema/book";
import { verifyToken } from "../../user/tools/validadeUser";
import { findBook } from "../tools/findBook";

export const addNote = async (token, bookID, note) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }

    let book = await Book.findOne({ _id: bookID, createdBy: user.email });
    if (book.notes.find((e) => e.text === note)) {
        return
    }
    
    book.notes = [
        ...book.notes,
        {
            text: note,
            created_at: Date.now()
        }
    ];
    book.save();
    return book.notes.find((e) => e.text === note)
}