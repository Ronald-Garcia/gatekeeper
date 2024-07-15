import { Hono } from "hono";
import { db } from "../db";
import { machinesAvailable, transactions } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createTransactionSchema } from "../validators/schemas";

/*
 *******************************************
 * ROUTE TO HANDLE TRANSACTION OPERATIONS. *
 *******************************************
 */

const transactionRoutes = new Hono();

/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */


/**
 * Route to get all transactions.
 * @returns all the transactions stored.
 */
transactionRoutes.get("/transactions",
  async (c) => {
    const allTransactions = await db.select().from(transactions);
    return c.json(allTransactions);  
});

transactionRoutes.get("/transactions/:name", async (c) => {
    
});


/*
 *******************
 * POST OPERATIONS *
 *******************
 */

/**
 * Route to add a transaction.
 * @json the transaction to add.
 * @returns the transaction that was added.
 */
transactionRoutes.post("/transactions", 
    zValidator("json", createTransactionSchema),
    async (c) => {

        const body = c.req.valid("json");

        const [ addedTransaction ] = await db.insert(transactions).values({ ...body, date: new Date() }).returning();

        return c.json(addedTransaction);
});

export default transactionRoutes;
