import { verifyToken } from "../../user/tools/validadeUser"
import { Note } from "../schema"

export const addNote = async (token, bookId, note) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }

    const checkNotes = await Note.findOne({ bookId: bookId, text: note })
    if (checkNotes)  {
        return
    }
    
    return await Note.create({
            bookId: bookId,
            text: note,
            createdAt: Date.now()
        })
}