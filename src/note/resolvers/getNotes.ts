import { verifyToken } from "../../user/tools/validadeUser"
import { Note } from "../schema"

export const getNotes = async (token, bookID) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }

    return await Note.find({ bookID: bookID })
} 