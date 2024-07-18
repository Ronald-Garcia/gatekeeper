import { Hono } from 'hono'
import userRoutes from './routes/users'
import machineRoutes from './routes/machines';
import budgetRoutes from './routes/budget-codes';
import relationRoutes from './routes/user-budget-relations';
import { HTTPException } from 'hono/http-exception';
import { cors } from 'hono/cors';
import transactionRoutes from './routes/transactions';
const app = new Hono()

// for testing, remove when in production
app.use("/*", cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// added routes
app.route("/", userRoutes);
app.route("/", machineRoutes);
app.route("/", budgetRoutes);
app.route("/", relationRoutes);
app.route("/", transactionRoutes);

// error handling
app.onError((err, c) => {
  console.error(`${err}`)

  if (err instanceof HTTPException) {
    return c.json({ message: err.message}, 404);
  }

  return c.json( {message: 'An unexpected error occurred.'}, 500);
});

export default app;