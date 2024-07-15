import { Hono } from 'hono'
import userRoutes from './routes/users'
import machineRoutes from './routes/machines';
import budgetRoutes from './routes/budget-codes';
import relationRoutes from './routes/user-budget-relations';
import { HTTPException } from 'hono/http-exception';
import { cors } from 'hono/cors';
import transactionRoutes from './routes/transactions';
const app = new Hono()

app.use("/*", cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route("/", userRoutes);
app.route("/", machineRoutes);
app.route("/", budgetRoutes);
app.route("/", relationRoutes);
app.route("/", transactionRoutes);

app.onError((err, c) => {
  console.error(`${err}`)

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json( {message: 'An unexpected error occurred.'}, 500);
});

export default app;