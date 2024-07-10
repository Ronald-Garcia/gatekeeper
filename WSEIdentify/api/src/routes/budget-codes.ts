import { Hono } from "hono";
import { db } from "../db";
import { budgetCodes } from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";
const budgetRoutes = new Hono();

budgetRoutes.get("/budgets", 
  cors(),
  async (c) => {
    try {   
        const allBudgets = await db.select().from(budgetCodes);
        return c.json(allBudgets);  
      } catch (err) {
        console.error(err);
        return c.json({ message: "Failed to fetch budgets due to unexpected error(s)."}, 500);
      }
});

budgetRoutes.get("/budgets/:code", async (c) => {
    
})

export default budgetRoutes;