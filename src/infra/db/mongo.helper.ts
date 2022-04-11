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
    
    async addOne (colletion: mongoose.Schema, data): Promise<void> {
        try {
            const schema = await this.findSchema(colletion);
            const model = await this.findModel('books', schema);
            await model.create(data);
        } catch (e) {
            throw new Error(e);
        }
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

    async findModel (modelName: string, schema: mongoose.Schema ): Promise<any> {
        const model = mongoose.model(modelName, schema);
        return model;
    },

    
}