import { Book } from "@/book/schema/book"
import { UserModel } from "@/domain/models"
import { User } from "./mongoose.schemas"
import { DeleteBook, LoadBook, LoadBookList, UpdateBook } from "@/domain/usecases"

import * as mongoose from "mongoose"

export const MongoHelper = {
    client: null,

    async connect (uri: string): Promise<void> {
        this.client = mongoose.connect(uri)
        this.checkConnection()
    },

    async checkConnection (): Promise<void> {
        !mongoose.connection ? console.log("Error connecting db") : console.log("Db connected successfully")
    },
    
    async addOneOn (modelName: string, data): Promise<boolean> {
        try {
            const model = await this.findModel(modelName)
            await model.create(data)
            return true
        } catch (e) {
            throw new Error(e)
        }
    },

    async findUserByEmail (email: string): Promise<UserModel> {
        const userModel = await this.findModel('user')
        const account = await userModel.findOne({ email })
        return account
    },

    async findUserByAccessToken (accessToken: string): Promise<UserModel> {
        const userModel = await this.findModel('user')
        const account = await userModel.findOne({ accessToken: accessToken })
        return account
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
            }
            const model = modelMapper[modelName]
            return model
        } catch (e) {
            throw new Error(e)
        }
    },

    async updateAccessToken (id: string, token: string): Promise<void> {
        try {
            const model = await this.findModel('user')
            await model.findOneAndUpdate({ id: id }, {
                accessToken: token
            })
        } catch (e) {
            new Error(e)
        }
    },

    async loadBookList (accessToken: string): Promise<LoadBookList.Result> {
        try {
            const userModel = await this.findModel('user')
            const account = await userModel.findOne({ accessToken: accessToken })
            const bookModel = await this.findModel('book')
            return await bookModel.find({ userId: account.id })
        } catch (error) {
            new Error(error)
        }
    },

    async loadOneBook (data: LoadBook.Request): Promise<LoadBook.Result> {
        try {
            const bookModel = await this.findModel('book')
            return await bookModel.findOne({ accessToken: data.accessToken, bookId: data.bookId })
        } catch (error) {
            new Error(error)
        }
    },

    async updateBook (data: UpdateBook.Params): Promise<void> {
        try {
            const userModel = await this.findModel('user')
            const account = await userModel.findOne({ accessToken: data.accessToken })
            const bookModel = await this.findModel('book')
            await bookModel.findOneAndUpdate({ userId: account.id, bookId: data.bookId }, {
                ...data,
                userId: account.id, 
                bookId: data.bookId,
            })
        } catch (e) {
            new Error(e)
        }
    },

    async deleteBook (data: DeleteBook.Params): Promise<void> {
        try {
            const userModel = await this.findModel('user')
            const account = await userModel.findOne({ accessToken: data.accessToken })
            const bookModel = await this.findModel('book')
            await bookModel.deleteOne({ userId: account.id, bookId: data.bookId })
        } catch (error) {
            new Error(error)
        }
    },
}