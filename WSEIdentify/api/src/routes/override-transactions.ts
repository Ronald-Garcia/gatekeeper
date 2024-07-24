import { Hono } from "hono";
import { db } from "../db";
import { machinesAvailable, overrideTransactions, transactions } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createOverrideTransactionSchema, createTransactionSchema } from "../validators/schemas";

/*
 *******************************************
 * ROUTE TO HANDLE TRANSACTION OPERATIONS. *
 *******************************************
 */

const overrideTransactionRoutes = new Hono();

/*
 ****************** 
 * GET OPERATIONS *
 ******************
 */


/**
 * Route to get all transactions.
 * @returns all the transactions stored.
 */
overrideTransactionRoutes.get("/otransactions",
  async (c) => {
    const allTransactions = await db.select().from(overrideTransactions);
    return c.json(allTransactions);  
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
overrideTransactionRoutes.post("/otransactions", 
    zValidator("json", createOverrideTransactionSchema),
    async (c) => {

        const body = c.req.valid("json");

        const [ addedTransaction ] = await db.insert(overrideTransactions).values({ ...body }).returning();

        return c.json(addedTransaction);
});

export default overrideTransactionRoutes;
