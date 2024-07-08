import { Hono } from 'hono'
import userRoutes from './routes/users'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/", userRoutes);

export default app;