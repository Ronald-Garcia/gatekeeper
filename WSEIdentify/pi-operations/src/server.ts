import { serve } from '@hono/node-server'
import app from './app'

const port = parseInt(process.env.PORT as string) || 3000
console.log(`Server is running on port ${port}`)

// TODO:
// consider automatically removing trainings of some people after some time
// run server
serve({
  fetch: app.fetch,
  port
})
