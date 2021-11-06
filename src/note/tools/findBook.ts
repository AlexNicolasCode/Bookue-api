import { Book } from "../../book/schema/book";

export const findBook = async (id, email) => {
    return await Book.findOne({  _id: id, createdBy: email });
}