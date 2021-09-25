import { Book } from "../schemas/book";

export const resolvers = {
  Query: {
    books: async () => {
      const book = await Book.find();
      return book
    },
    getBook: async (_, { id }) => {
      const book = await Book.findOne({ _id: id });
      return book
    }
  },

  Mutation: {
    addBook: async (_, { title, author, description }) => {
      const bookProps = {
        title: title,
        author: author,
        description: description
      }      

      const book = await Book.findOne({ title: title });

      if (!book) {
        const newBook = new Book(bookProps);
        return newBook.save();
      }
    },
    updateBook: async (_, { id, newTitle, newAuthor, newDescription }) => {
      const bookProps = {
        title: newTitle,
        author: newAuthor,
        description: newDescription
      }

      await Book.findOneAndUpdate({ _id: id }, bookProps);
      const updatedBook = await Book.findOne({ _id: id });

      return updatedBook
    },
    deleteBook: async (_, { id }) => {
      const book = await Book.findOneAndDelete({ _id: id });
      return book
    }
  }  
};