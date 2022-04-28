import * as mongoose from "mongoose"
import * as dotenv from 'dotenv'
import { ApolloServer } from "apollo-server"

import { typeDefs } from "./types" 
import { resolvers } from "./resolver"

dotenv.config()
const mongooseParams: any = {  useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.URI, mongooseParams)
!mongoose.connection ? console.log("Error connecting db") : console.log("Db connected successfully")

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ req }) => {
    const token = req.headers.authorization || ''
    return { token }
  }
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
