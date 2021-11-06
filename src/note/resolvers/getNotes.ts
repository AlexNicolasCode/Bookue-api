import { verifyToken } from "../../user/tools/validadeUser"
import { findBook } from "../tools/findBook"

export const getNotes = async (token, bookID) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }

    const book = await findBook(bookID, user.email)
    console.log(book)
    if (!book.notes) {
        return []
    }

    return book.notes.reverse()
} 