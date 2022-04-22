import { Book } from "@/book/schema/book";
import { UserModel } from "@/domain/models";
import { User } from "@/user/schema/user";
import * as mongoose from "mongoose";

export const MongoHelper = {
    client: null,

    async connect (uri: string): Promise<void> {
        this.client = mongoose.connect(uri);
        this.checkConnection();
    },

    async checkConnection (): Promise<void> {
        !mongoose.connection ? console.log("Error connecting db") : console.log("Db connected successfully")
    },
    
    async addOneOn (modelName: string, data): Promise<boolean> {
        try {
            const model = await this.findModel(modelName);
            await model.create(data);
            return true
        } catch (e) {
            throw new Error(e);
        }
    },

    async findUserByEmail (email: string): Promise<UserModel> {
        const user = await this.findModel('user')
        const account = await user.findOne({ email })
        return account
    },
    
    async countDocuments (modelName: string, data: any): Promise<number> {
        try {
            const model = await this.findModel(modelName);
            const count = await model.countDocuments(data);
            return count
        } catch (e) {
            throw new Error(e);
        }
    },
    
    async deleteManyOn(modelName: string): Promise<void> {
        const findModel = await this.findModel(modelName);
        await findModel.deleteMany({})
    },

    async findModel (modelName: string): Promise<any> {
        try {
            const modelMapper = {
                'book': Book,
                'user': User,
            };
            const model = modelMapper[modelName];
            return model
        } catch (e) {
            throw new Error(e);
        };
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
}