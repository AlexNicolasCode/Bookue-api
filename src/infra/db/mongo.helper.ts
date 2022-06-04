import { UserModel } from "@/domain/models"
import { AddNote, DeleteBook, LoadBook, LoadBooks, LoadNotes, UpdateBook } from "@/domain/usecases"
import { Book, Note, User } from "./mongoose.schemas"

import * as mongoose from "mongoose"

export const MongoHelper = {
    client: null,

    async connect (uri: string): Promise<void> {
        this.client = mongoose.connect(uri)
    },
    
    async countDocuments (modelName: string, data: any): Promise<number> {
        try {
            const model = await this.findModel(modelName)
            const count = await model.countDocuments(data)
            return count
        } catch (e) {
            throw new Error(e)
        }
    },
    
    async deleteManyOn(modelName: string): Promise<void> {
        const findModel = await this.findModel(modelName)
        await findModel.deleteMany({})
    },

    async findModel (modelName: string): Promise<any> {
        try {
            const modelMapper = {
                'book': Book,
                'user': User,
                'note': Note,
            }
            const model = modelMapper[modelName]
            return model
        } catch (e) {
            throw new Error(e)
        }
    },
}