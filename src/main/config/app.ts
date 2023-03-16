import express from "express"
import cors from "cors"

import { setupApolloServer } from '@/main/graphql/apollo'


export const setupApp = async (): Promise<express.Express> => {
  const app = express()
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({ origin: ["http://localhost:8000", "https://bookue.vercel.app"] })
  )
  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })
  return app
}