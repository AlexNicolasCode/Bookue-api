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
}