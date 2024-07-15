import { Hono } from "hono";
import { db } from "../db";
import { machinesAvailable, transactions } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
const transactionRoutes = new Hono();

transactionRoutes.get("/transactions",
  async (c) => {
    const allTransactions = await db.select().from(transactions);
    return c.json(allTransactions);  
});

transactionRoutes.get("/transactions/:name", async (c) => {
    
})

export default transactionRoutes;
