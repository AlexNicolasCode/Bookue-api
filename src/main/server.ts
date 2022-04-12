import env from '@/env'
import { MongoHelper } from '@/infra/db'

const port = 8000

MongoHelper.connect(env.MONGO_URL)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(console.error)