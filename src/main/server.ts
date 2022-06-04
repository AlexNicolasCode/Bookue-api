import mongoose from 'mongoose'
import env from './config/env'

mongoose.connect(env.mongoUrl)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}/graphql`))
  })
  .catch(console.error)