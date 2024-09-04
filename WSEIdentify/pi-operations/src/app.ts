import { Hono } from 'hono'
import userRoutes from './routes/users'
import machineRoutes from './routes/machines';
import budgetRoutes from './routes/budget-codes';
import budgetRelationRoutes from './routes/user-budget-relations';
import { HTTPException } from 'hono/http-exception';
import { cors } from 'hono/cors';
import transactionRoutes from './routes/transactions';
import overrideTransactionRoutes from './routes/override-transactions';
import piRoutes from './routes/pi';
import machineRelationRoutes from './routes/user-machine-relations';
import reportRoutes from './routes/report';
const app = new Hono()

// for testing, remove when in production
app.use("/*", cors());

app.get('/', (c) => {
  return c.text('Hello Hono!');
})

// added routes
app.route("/", piRoutes);

// error handling
app.onError((err, c) => {

  console.error(err.message);
  if (err instanceof HTTPException) {
    return c.json({ message: err.message}, 404);
  }

  return c.json( {message: 'An unexpected error occurred.'}, 500);
});

export default app;