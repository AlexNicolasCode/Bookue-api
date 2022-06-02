import { verifyToken } from "../../user/tools/validadeUser"
import { Note } from "../schema"

export const getNotes = async (token, bookId) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }

    return await Note.find({ bookId: bookId })
} 