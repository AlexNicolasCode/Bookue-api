import { verifyToken } from "../../user/tools/validadeUser";
import { Note } from "../schema";

export const addNote = async (token, bookID, note) => {
    const user: any = await verifyToken(token)

    if (!user) {
        return
    }
    
    return await Note.create({
            bookID: bookID,
            text: note,
            created_at: Date.now()
        })
}