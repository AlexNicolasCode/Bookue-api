import { model, Schema } from "mongoose"

const UserSchema = new Schema({
    name: String, 
    email: String, 
    password: String,
    accessToken: String,
})

export const User = model("bookue-users", UserSchema)