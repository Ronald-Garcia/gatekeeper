import { Hono } from "hono";
import { db } from "../db";
import { machinesAvailable, transactions } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createTransactionSchema } from "../validators/schemas";
const transactionRoutes = new Hono();

transactionRoutes.get("/transactions",
  async (c) => {
    const allTransactions = await db.select().from(transactions);
    return c.json(allTransactions);  
});

transactionRoutes.get("/transactions/:name", async (c) => {
    
});

transactionRoutes.post("/transactions", 
    zValidator("json", createTransactionSchema),
    async (c) => {

        const body = c.req.valid("json");

        const [ addedTransaction ] = await db.insert(transactions).values({ ...body, date: new Date() }).returning();

        return c.json(addedTransaction);
});

export default transactionRoutes;
