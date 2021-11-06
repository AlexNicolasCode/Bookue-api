import { Book } from "../../book/schema/book"
import { verifyToken } from "../../user/tools/validadeUser"

export const getNotes = async (token, bookID) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }

    const book = await Book.findOne({ _id: bookID, createdBy: user.email });
    return book.notes
} 