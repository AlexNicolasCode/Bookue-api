import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    title: String
    author: String
    description: String
  }

  type Query {
    books: [Book]
  }
`;

export type Book = {
  title: string
  author: string
  description: string
}

export type Resolvers = {
  Query: {
    books: () => Book,
  },
}