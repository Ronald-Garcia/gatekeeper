import { serve } from '@hono/node-server'
import app from './app'

const port = parseInt(process.env.PORT as string) || 3000
console.log(`Server is running on port ${port}`)

// run server
serve({
  fetch: app.fetch,
  port
})
