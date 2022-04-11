import { Book } from "@/book/schema/book";
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
    
    async addOneOn (schemaName: string, colletionName: string, data): Promise<boolean> {
        try {
            const schema = await this.findSchema(schemaName);
            const model = await this.findModel(colletionName, schema);
            await model.create(data);
            return true
        } catch (e) {
            throw new Error(e);
        }
    },

    
    async deleteManyOn(schemaName: string, colletionName: string): Promise<void> {
        const schema = await this.findSchema(schemaName);
        const findModel = await this.findModel(colletionName, schema);
        await findModel.deleteMany({})
    },

    async findSchema (schemaName: string): Promise<mongoose.Schema> {
        try {
            const schemaMapper = {
                'book': Book,
                'user': User,
            };
            return schemaMapper[schemaName];
        } catch (e) {
            throw new Error(e);
        };
    },

    async findModel (colletionName: string, schema: mongoose.Schema ): Promise<any> {
        const model = mongoose.model(colletionName, schema);
        return model;
    },


}