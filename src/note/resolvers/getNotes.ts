import { Book } from "../../book/schema/book"
import { verifyToken } from "../../user/tools/validadeUser"
import { findBook } from "../tools/findBook"

export const getNotes = async (token, bookID) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }

    const book = await findBook(bookID, user.email)
    return await book.notes.reverse()
} 