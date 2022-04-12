import { setupApolloServer } from '@/main/graphql/apollo'

import * as express from 'express'

export const setupApp = async (): Promise<express.Express> => {
  const app = express()
  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })
  return app
}